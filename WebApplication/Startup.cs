using ClassLibrary.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace WebApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<WebSocketConnectionManager>();
            services.AddTransient<ChatMessageHandler>(); // or WebSocketHandler depending on your setup
            services.AddWebSocketManager();
            services.AddDbContext<SwitchContext>(options =>
       options.UseSqlServer(Configuration.GetConnectionString("DefaultConnectionString")));

            services.AddControllers();
            services.AddScoped<SwitchContext>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            // WebSocket middleware configuration
            app.UseWebSockets();

            // Map WebSocket endpoints using extension method
            app.MapWebSocketManager("/ws/chat", app.ApplicationServices.GetService<ChatMessageHandler>());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

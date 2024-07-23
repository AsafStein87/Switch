// WebSocketManagerExtensions.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace WebApplication
{
    public static class WebSocketManagerExtensions
    {
        public static IApplicationBuilder MapWebSocketManager(this IApplicationBuilder app, string path, WebSocketHandler handler)
        {
            app.UseWebSockets();
            app.Map(path, (appBuilder) =>
            {
                appBuilder.UseMiddleware<WebSocketManagerMiddleware>(handler);
            });

            return app;
        }

        public static IServiceCollection AddWebSocketManager(this IServiceCollection services)
        {
            services.AddSingleton<WebSocketConnectionManager>();
            return services;
        }
    }
}

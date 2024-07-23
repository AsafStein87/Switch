using Microsoft.Extensions.Logging;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication
{
    public class ChatWebSocketHandler : WebSocketHandler
    {
        private readonly ILogger<ChatWebSocketHandler> _logger;

        public ChatWebSocketHandler(WebSocketConnectionManager webSocketConnectionManager, ILogger<ChatWebSocketHandler> logger)
            : base(webSocketConnectionManager, logger)
        {
            _logger = logger;
        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);
            _logger.LogInformation($"WebSocket connected: {WebSocketConnectionManager.GetId(socket)}");
        }

        public override async Task OnDisconnected(WebSocket socket)
        {
            await base.OnDisconnected(socket);
            _logger.LogInformation($"WebSocket disconnected: {WebSocketConnectionManager.GetId(socket)}");
        }

        public override async Task OnMessageReceived(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            _logger.LogInformation($"Message received from {WebSocketConnectionManager.GetId(socket)}: {message}");

            // Handle your message processing logic here

            // Example: Echoing the received message back to the client
            await SendMessageAsync(socket, $"Echo: {message}");
        }
    }
}

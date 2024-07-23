using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace WebApplication
{
    public abstract class WebSocketHandler
    {
        protected WebSocketConnectionManager WebSocketConnectionManager { get; set; }
        private readonly ILogger<WebSocketHandler> _logger;

        public WebSocketHandler(WebSocketConnectionManager webSocketConnectionManager, ILogger<WebSocketHandler> logger)
        {
            WebSocketConnectionManager = webSocketConnectionManager;
            _logger = logger;
        }

        public virtual async Task OnConnected(WebSocket socket)
        {
            await WebSocketConnectionManager.AddSocketAsync(Guid.NewGuid().ToString(), socket);
            _logger.LogInformation($"WebSocket connected: {socket}");
        }

        public virtual async Task OnDisconnected(WebSocket socket)
        {
            var socketId = WebSocketConnectionManager.GetId(socket);
            await WebSocketConnectionManager.RemoveSocketAsync(socketId);
            _logger.LogInformation($"WebSocket disconnected: {socket}");
        }

        public abstract Task OnMessageReceived(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);

        public async Task SendMessageAsync(WebSocket socket, string message)
        {
            if (socket.State != WebSocketState.Open)
                return;

            var buffer = Encoding.UTF8.GetBytes(message);
            var segment = new ArraySegment<byte>(buffer);

            await socket.SendAsync(segment, WebSocketMessageType.Text, true, CancellationToken.None);
        }

        public async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            await OnMessageReceived(socket, result, buffer);
        }
    }
}

using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace WebApplication
{
    public class ChatMessageHandler : WebSocketHandler
    {
        public ChatMessageHandler(WebSocketConnectionManager manager, ILogger<ChatMessageHandler> logger) : base(manager, logger)
        {
        }

        public override async Task OnMessageReceived(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            // Example: Echo back the received message to the client
            await SendMessageAsync(socket, message);
        }
    }
}

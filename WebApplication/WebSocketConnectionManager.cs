using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace WebApplication
{
    public class WebSocketConnectionManager
    {
        private readonly ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

        public WebSocket GetSocketById(string id)
        {
            return _sockets.TryGetValue(id, out var socket) ? socket : null;
        }

        public ConcurrentDictionary<string, WebSocket> GetAll()
        {
            return _sockets;
        }

        public string GetId(WebSocket socket)
        {
            foreach (var (id, webSocket) in _sockets)
            {
                if (webSocket == socket)
                    return id;
            }
            return null;
        }

        public async Task AddSocketAsync(string id, WebSocket socket)
        {
            _sockets.TryAdd(id, socket);
        }

        public async Task RemoveSocketAsync(string id)
        {
            _sockets.TryRemove(id, out _);
        }
    }
}

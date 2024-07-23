using System;
using System.Net.WebSockets;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using WebApplication;

public class WebSocketManagerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<WebSocketManagerMiddleware> _logger;
    private readonly WebSocketHandler _webSocketHandler;

    public WebSocketManagerMiddleware(RequestDelegate next, WebSocketHandler webSocketHandler, ILogger<WebSocketManagerMiddleware> logger)
    {
        _next = next;
        _webSocketHandler = webSocketHandler;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        if (!context.WebSockets.IsWebSocketRequest)
        {
            await _next(context);
            return;
        }

        try
        {
            WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
            await _webSocketHandler.OnConnected(webSocket);

            // Handle messages in a loop until the WebSocket is closed
            await ReceiveMessages(webSocket, _webSocketHandler);

            await _webSocketHandler.OnDisconnected(webSocket);
        }
        catch (Exception ex)
        {
            _logger.LogError($"WebSocket connection error: {ex.Message}");
            context.Response.StatusCode = 500;
        }
    }

    private async Task ReceiveMessages(WebSocket webSocket, WebSocketHandler handler)
    {
        byte[] buffer = new byte[1024 * 4];
        WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), System.Threading.CancellationToken.None);

        while (!result.CloseStatus.HasValue)
        {
            await handler.ReceiveAsync(webSocket, result, buffer);
            result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), System.Threading.CancellationToken.None);
        }
    }
}

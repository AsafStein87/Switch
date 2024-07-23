using ClassLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.DTO;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Runtime.CompilerServices;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class ChatController : ControllerBase
    {
        SwitchContext db = new SwitchContext();

        [HttpPost]
        [Route("SendMessage")]

        public async Task<IActionResult> SendMessage([FromBody] ChatDTO chatDTO)
        {
            if (chatDTO == null)
                return BadRequest();

            // Convert ChatDTO to ChatMessage
            var chatMessage = new ChatMessage
            {
                Message = chatDTO.Message,
                SentAt = DateTime.UtcNow,
                // Assuming you have OfferCode in your DTO or you set it appropriately
                //OfferCode = chatDTO.OfferCode
            };

            db.ChatMessages.Add(chatMessage);
            await db.SaveChangesAsync();

            return Ok(chatMessage);
        }

        [HttpGet("GetMessages/{offerCode}")]
        public async Task<IActionResult> GetMessages(int offerCode)
        {
            var messages = await db.ChatMessages
                .Where(cm => cm.OfferCode == offerCode)
                .ToListAsync();

            return Ok(messages);
        }
    }
}

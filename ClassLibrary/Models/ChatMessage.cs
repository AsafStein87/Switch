using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public int OfferCode { get; set; } // Ensure this matches the type in your SQL table
        public string Message { get; set; }
        public DateTime SentAt { get; set; }

        // Navigation property
        public Offer Offer { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Models
{
    public class FavoriteOffers
    {
        public int OfferCode { get; set; }

       
        public string OfferType { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Description { get; set; }

        
        public string Status { get; set; }

        
        public string Rating { get; set; } 

        public int? FactoryCode { get; set; } 

        public int? WasteCode { get; set; } 

        public string FactoryAddress { get; set; }

        
        public string Quantity { get; set; } 

       
        public string ContractorRecommend { get; set; }


        //public Offer Offer { get; set; }

        //public Factory Factory { get; set; }
    }
}

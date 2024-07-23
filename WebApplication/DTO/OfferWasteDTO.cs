namespace WebApplication.DTO
{
    public class OfferWasteDTO
    {

        public int OfferCode { get; set; }

        public string OfferType { get; set; }
      
        public string Quantity { get; set; }
        public string? FactoryAddress { set; get; }

        public DateTime StartDate { get; set; } 

        public DateTime EndDate { get; set; }

        public string? Description { get; set; }
        public string ContractorRecommend { get; set; }


        




    }
}

using ClassLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Runtime.CompilerServices;
using WebApplication.DTO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewAllOffersController : ControllerBase
    {
        SwitchContext db = new SwitchContext();     
       
        [HttpGet]
        [Route("GetAllOffers")] //מביא את כל ההצעות מהדאטה בייס 
        public List<OfferWasteDTO> GetAllOffers()
        {
            List<OfferWasteDTO> offerLst = new List<OfferWasteDTO>();
            try
            {
                if (db.Offers != null)
                {
                    foreach (Offer o in db.Offers)
                    {
                        OfferWasteDTO offerw = new OfferWasteDTO
                        {
                            OfferCode = o.OfferCode, 
                            OfferType = o.OfferType, 
                            Quantity = o.Quantity, 
                            FactoryAddress = o.FactoryAddress, 
                            StartDate = o.StartDate,
                            EndDate = o.EndDate, 
                            Description = o.Description, 
                            ContractorRecommend = o.ContractorRecommend 

                        };
                        offerLst.Add(offerw);
                    }                    
                }                
            }
            catch (Exception e)
            {
                throw new Exception("An error occurred while fetching the offers", e);
            }
            return offerLst;

        }

    }
}


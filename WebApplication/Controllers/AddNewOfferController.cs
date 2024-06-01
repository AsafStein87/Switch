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
    public class AddNewOfferController : ControllerBase
    {
        SwitchContext db = new SwitchContext();        

        [HttpPost]//העלאת הצעה חדשה לאתר 
        [Route("AddOffer")]
        public IActionResult Post([FromBody] OfferWasteDTO NewOffer)
        {
            try
            {
                Offer o1 = new Offer();
                o1.OfferCode = NewOffer.OfferCode;
                o1.OfferType = NewOffer.OfferType;
                o1.StartDate = NewOffer.StartDate;
                o1.EndDate = NewOffer.EndDate;
                o1.Description = NewOffer.Description;
                o1.Quantity = NewOffer.Quantity;
                o1.FactoryAddress = NewOffer.FactoryAddress;
                o1.ContractorRecommend = NewOffer.ContractorRecommend;
                if (NewOffer.OfferType == "Paper")
                {
                    o1.WasteCode = 40;
                }
                else if (NewOffer.OfferType == "Plastic")
                {
                    o1.WasteCode = 50;

                }
                else if (NewOffer.OfferType == "Wood")
                {
                    o1.WasteCode = 60;

                }
                else
                {
                    o1.WasteCode = 70;
                }
                db.Offers.Add(o1);
                db.SaveChanges();
                return Ok(NewOffer);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       
    }
}

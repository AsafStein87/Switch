using ClassLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using System;
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
        private static Random random = new Random();

        [HttpPost]//העלאת הצעה חדשה לאתר 
        [Route("AddOffer")]
        public IActionResult Post([FromBody] OfferWasteDTO NewOffer)
        {
            try
            {
                
               //var factoryUser = db.Factories.FirstOrDefault(x => x.FactoryCode == NewOffer.FactoryCode);

                Offer o1 = new Offer();
                o1.OfferCode = random.Next(1, int.MaxValue);
                o1.FactoryCode = NewOffer.FactoryCode;
                o1.OfferType = NewOffer.OfferType;
                o1.Quantity = NewOffer.Quantity;
                o1.FactoryAddress = NewOffer.FactoryAddress;
                o1.StartDate = NewOffer.StartDate;
                o1.EndDate = NewOffer.EndDate;
                o1.Description = NewOffer.Description;
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
                return BadRequest(new { message = "Error processing request", details = e.Message });
            }

        }
        [HttpGet]
        [Route("GetFactoryAddress")]
        public IActionResult GetFactoryAddress([FromQuery] int factoryCode)
        {
            try
            {
                var factory = db.Factories.FirstOrDefault(f => f.FactoryCode == factoryCode);
                if (factory != null)
                {
                    return Ok(new { address = factory.FactoryAddress });
                }
                return NotFound("Factory not found");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}

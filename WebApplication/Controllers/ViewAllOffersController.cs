using ClassLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Runtime.CompilerServices;
using WebApplication.DTO;
using Microsoft.EntityFrameworkCore;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewAllOffersController : ControllerBase
    {
        SwitchContext db = new SwitchContext();
        int OfferCode = 0;
        [HttpGet]
        [Route("GetAllOffers")] //מביא את כל ההצעות מהדאטה בייס 
        public ActionResult<List<OfferWasteDTO>> GetAllOffers(string? location = null, string? wasteType=null, string? quantity=null)
        {
            List<OfferWasteDTO> offerLst = new List<OfferWasteDTO>();
            try
            {
                if (db.Offers != null)
                {
                    var offersQuery = db.Offers.AsQueryable(); // הבאת המידע בצורה יעילה יותר ומאפשר ללינק לסנן בצורה יעילה יותר

                    if (!string.IsNullOrEmpty(location))
                    {
                        offersQuery = offersQuery.Where(x => EF.Functions.Like(x.FactoryAddress.Trim(), $"%{location.Trim()}%"));
                        // EF.Functions.Like > פונקציה של אנטיטי פריים וורק, כמו לייק בSQL

                    }
                    if (!string.IsNullOrEmpty(wasteType))
                    {
                        offersQuery = offersQuery.Where(x => EF.Functions.Like(x.OfferType.Trim(), $"%{wasteType.Trim()}%"));
                        //נשתמש בטרים כדי להימנע מרווחים שעלולים למנוע מהחזרת תוצאות רלוונטיות
                    }
                    if (!string.IsNullOrEmpty(quantity))
                    {
                        offersQuery = offersQuery.Where(x => x.Quantity.Trim() == quantity.Trim());

                    }

                    var filteredOffers = offersQuery.ToList();
                    foreach (Offer o in filteredOffers)
                    {
                        OfferCode = o.OfferCode;

                        OfferWasteDTO offerw = new OfferWasteDTO
                        {
                            OfferType = o.OfferType,
                            Quantity = o.Quantity,
                            FactoryAddress = o.FactoryAddress,
                            StartDate = o.StartDate,
                            EndDate = o.EndDate,
                            Description = o.Description,
                            ContractorRecommend = o.ContractorRecommend,
                            OfferCode = o.OfferCode
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


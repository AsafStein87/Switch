using ClassLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using WebApplication.DTO;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowFavoritesController : ControllerBase
    {
        SwitchContext db = new SwitchContext();
        //[HttpGet]
        //[Route("GetFavorites")]
        //public ActionResult<List<OfferWasteDTO>> GetFavoriteOffers([FromQuery] int factoryCode)
        //{
        //    try
        //    {
        //        var favoriteOffers = db.FavoriteOffers
        //            .Include(f => f.Offer)
        //            .Include(f => f.Factory)
        //            .Where(f => f.FactoryCode == factoryCode)
        //            .Select(f => new OfferWasteDTO
        //            {
        //                OfferType = f.Offer.OfferType,
        //                Quantity = f.Offer.Quantity,
        //                FactoryAddress = f.Offer.FactoryAddress,
        //                StartDate = f.Offer.StartDate,
        //                EndDate = f.Offer.EndDate,
        //                Description = f.Offer.Description,
        //                ContractorRecommend = f.Offer.ContractorRecommend
        //            })
        //            .ToList();

        //        if (favoriteOffers == null)
        //        {
        //            return NotFound("No favorite offers found.");
        //        }

        //        return Ok(favoriteOffers);
        //    }
        //    catch (Exception e)
        //    {
        //        return StatusCode(500, $"Internal server error: {e.Message}");
        //    }
        //}

        [HttpDelete]
        [Route("DeleteFavorite")]
        public async Task<IActionResult> DeleteFavorite([FromQuery] int factoryCode, [FromQuery] int offerCode)
        {
            try
            {
                if (factoryCode <= 0 || offerCode <= 0)
                {
                    return BadRequest("Invalid factory code or offer code.");
                }

                var favoriteOffer = await db.FavoriteOffers
                    .FirstOrDefaultAsync(f => f.FactoryCode == factoryCode && f.OfferCode == offerCode);

                if (favoriteOffer == null)
                {
                    return NotFound("Favorite offer not found.");
                }

                db.FavoriteOffers.Remove(favoriteOffer);
                await db.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("AddToFavorite")]
        public async Task<IActionResult> AddToFavorite([FromBody] int OfferCodeIn)
        {
            try
            {
                var offer = await db.Offers.FirstOrDefaultAsync(x => x.OfferCode == OfferCodeIn);
                if (offer == null)
                {
                    return NotFound("Offer not found.");
                }

                var favoriteOffer = new FavoriteOffers
                {
                    OfferCode = offer.OfferCode,
                    OfferType = offer.OfferType,
                    StartDate = offer.StartDate,
                    EndDate = offer.EndDate,
                    Description = offer.Description,
                    Status = offer.Status,
                    Rating = offer.Rating,
                    FactoryCode = offer.FactoryCode,
                    WasteCode = offer.WasteCode,
                    FactoryAddress = offer.FactoryAddress,
                    Quantity = offer.Quantity,
                    ContractorRecommend = offer.ContractorRecommend
                };

                db.FavoriteOffers.Add(favoriteOffer);
                db.SaveChanges();

                return Ok(new { message = "Offer added to favorites successfully.", favoriteOffer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding offer to favorites: {ex.Message}");
            }
        }



    }
}

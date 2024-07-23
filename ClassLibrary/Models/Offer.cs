using System;
using System.Collections.Generic;

namespace ClassLibrary.Models;

public partial class Offer
{
    public int OfferCode { get; set; } 

    //public string OfferName { get; set; } = null!;

    public string OfferType { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public string? Description { get; set; }

    public string? Status { get; set; } 

    public string? Rating { get; set; }


    public string? FactoryAddress { get; set; } 
    public string Quantity { get; set; } 
    public string ContractorRecommend { get; set; }
    public int? FactoryCode { get; set; }

    public int? WasteCode { get; set; }
    public ICollection<ChatMessage> ChatMessages { get; set; }
    public virtual ICollection<ActWasteRemoval> ActWasteRemovals { get; set; } = new List<ActWasteRemoval>();
    public ICollection<FavoriteOffers> FavoriteOffers { get; set; }


    public virtual Factory? FactoryCodeNavigation { get; set; }

    public virtual Waste? WasteCodeNavigation { get; set; }

    public virtual ICollection<Contractor> ContractorCodes { get; set; } = new List<Contractor>();

    public virtual ICollection<Factory> FactoryCodes { get; set; } = new List<Factory>();

    public virtual ICollection<Factory> FactoryCodesNavigation { get; set; } = new List<Factory>();
}

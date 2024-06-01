using System;
using System.Collections.Generic;

namespace ClassLibrary.Models;

public partial class ActWasteRemoval
{
    public int WasteRemovalCode { get; set; }

    public DateTime RemovalDate { get; set; }

    public string? RemovalQ { get; set; }

    public string ReceivingFactory { get; set; } = null!;

    public string RemovingFactory { get; set; } = null!;

    public string ActContractor { get; set; } = null!;

    public string? Satisfaction { get; set; }

    public int OfferCode { get; set; }

    public virtual Offer OfferCodeNavigation { get; set; } = null!;
}

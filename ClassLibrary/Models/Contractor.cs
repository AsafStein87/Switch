using System;
using System.Collections.Generic;

namespace ClassLibrary.Models;

public partial class Contractor
{
    public int ContractorCode { get; set; }

    public string ContractorName { get; set; } = null!;

    public string ContractorPhone { get; set; } = null!;

    public string? ContractorEmail { get; set; }

    public string? Caddress { get; set; }

    public string? RejectedWr { get; set; }

    public string? AcceptedWr { get; set; }

    public virtual ICollection<Offer> OfferCodes { get; set; } = new List<Offer>();
}

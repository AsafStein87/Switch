using System;
using System.Collections.Generic;

namespace ClassLibrary.Models;

public partial class Factory
{
    public int FactoryCode { get; set; }

    public string FactoryName { get; set; } = null!;

    public string FactoryType { get; set; } = null!;

    public string FactoryAddress { get; set; } = null!;

    public string? FactoryPhone { get; set; }
    
   
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;

    public int? IareaCode { get; set; }

    public virtual IndustrialArea? IareaCodeNavigation { get; set; }

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();

    public virtual ICollection<Waste> Wastes { get; set; } = new List<Waste>();

    public virtual ICollection<Offer> OfferCodes { get; set; } = new List<Offer>();

    public virtual ICollection<Offer> OfferCodesNavigation { get; set; } = new List<Offer>();

    
}

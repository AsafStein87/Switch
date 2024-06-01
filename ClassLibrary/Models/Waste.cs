using System;
using System.Collections.Generic;

namespace ClassLibrary.Models;

public partial class Waste
{
    public int WasteCode { get; set; }

    public string WasteVal { get; set; } = null!;
    public string WasteType { get; set; } = null!;
    public string Quantity { get; set; } 

    public DateTime CollectingDate { get; set; }

    public int? ContainerNum { get; set; }

    public int? FactoryCode { get; set; }

    

    public virtual Factory? FactoryCodeNavigation { get; set; }

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();

    
}

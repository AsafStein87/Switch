using System;
using System.Collections.Generic;

namespace ClassLibrary.Models;

public partial class IndustrialArea
{
    public int IareaCode { get; set; }

    public string IareaName { get; set; } = null!;

    public string Ilocation { get; set; } = null!;

    public virtual ICollection<Factory> Factories { get; set; } = new List<Factory>();
}

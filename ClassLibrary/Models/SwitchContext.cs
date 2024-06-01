using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ClassLibrary.Models;

public partial class SwitchContext : DbContext
{

    
    public SwitchContext()
    {


    }

    public SwitchContext(DbContextOptions<SwitchContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ActWasteRemoval> ActWasteRemovals { get; set; }


    public virtual DbSet<Contractor> Contractors { get; set; }

    public virtual DbSet<Factory> Factories { get; set; }

    public virtual DbSet<IndustrialArea> IndustrialAreas { get; set; }

    public virtual DbSet<Offer> Offers { get; set; }


    public virtual DbSet<Waste> Wastes { get; set; }



     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
            => optionsBuilder.UseSqlServer("Server=LAPTOP-4QHEATTF\\SQLEXPRESS01;Database=Switch;Trusted_Connection=True;Encrypt=false");
   
    
    //השרת של רופין למטה ממש פה
    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //{
    //    var config = new ConfigurationBuilder().AddJsonFile("appsettings.json", false).Build();
    //    String connStr = config.GetConnectionString("DefaultConnectionString");
    //    optionsBuilder.UseSqlServer(connStr);
    //}


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ActWasteRemoval>(entity =>
        {
            entity.HasKey(e => new { e.WasteRemovalCode, e.OfferCode }).HasName("PK__ActWaste__D4C4A03093886A01");

            entity.ToTable("ActWasteRemoval");

            entity.Property(e => e.ActContractor).HasMaxLength(40);
            entity.Property(e => e.ReceivingFactory).HasMaxLength(40);
            entity.Property(e => e.RemovalDate).HasColumnType("datetime");
            entity.Property(e => e.RemovalQ).HasMaxLength(50);
            entity.Property(e => e.RemovingFactory).HasMaxLength(50);
            entity.Property(e => e.Satisfaction).HasMaxLength(40);

            entity.HasOne(d => d.OfferCodeNavigation).WithMany(p => p.ActWasteRemovals)
                .HasForeignKey(d => d.OfferCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ActWasteR__Offer__31EC6D26");
        });

       

        modelBuilder.Entity<Contractor>(entity =>
        {
            entity.HasKey(e => e.ContractorCode).HasName("PK__Contract__35685533EFBE2496");

            entity.ToTable("Contractor");

            entity.Property(e => e.ContractorCode).ValueGeneratedNever();
            entity.Property(e => e.AcceptedWr)
                .HasMaxLength(50)
                .HasColumnName("AcceptedWR");
            entity.Property(e => e.Caddress)
                .HasMaxLength(60)
                .HasColumnName("CAddress");
            entity.Property(e => e.ContractorEmail).HasMaxLength(44);
            entity.Property(e => e.ContractorName).HasMaxLength(40);
            entity.Property(e => e.ContractorPhone).HasMaxLength(44);
            entity.Property(e => e.RejectedWr)
                .HasMaxLength(50)
                .HasColumnName("RejectedWR");

            entity.HasMany(d => d.OfferCodes).WithMany(p => p.ContractorCodes)
                .UsingEntity<Dictionary<string, object>>(
                    "GivingTo",
                    r => r.HasOne<Offer>().WithMany()
                        .HasForeignKey("OfferCode")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__GivingTo__OfferC__48CFD27E"),
                    l => l.HasOne<Contractor>().WithMany()
                        .HasForeignKey("ContractorCode")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__GivingTo__Contra__47DBAE45"),
                    j =>
                    {
                        j.HasKey("ContractorCode", "OfferCode").HasName("PK__GivingTo__EB04CAE3CFBF50A3");
                        j.ToTable("GivingTo");
                    });
        });

        modelBuilder.Entity<Factory>(entity =>
        {
            entity.HasKey(e => e.FactoryCode).HasName("PK__Factory__59BBB19EAFCC846C");

            entity.ToTable("Factory");

            entity.Property(e => e.FactoryCode).ValueGeneratedNever();
            entity.Property(e => e.FactoryAddress).HasMaxLength(50);
            entity.Property(e => e.FactoryName).HasMaxLength(40);
            entity.Property(e => e.FactoryPhone).HasMaxLength(24);
            entity.Property(e => e.FactoryType).HasMaxLength(40);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(30);

            entity.Property(e => e.IareaCode).HasColumnName("IAreaCode");

            entity.HasOne(d => d.IareaCodeNavigation).WithMany(p => p.Factories)
                .HasForeignKey(d => d.IareaCode)
                .HasConstraintName("FK__Factory__IAreaCo__267ABA7A");

            entity.HasMany(d => d.OfferCodes).WithMany(p => p.FactoryCodes)
                .UsingEntity<Dictionary<string, object>>(
                    "Offering",
                    r => r.HasOne<Offer>().WithMany()
                        .HasForeignKey("OfferCode")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Offering__OfferC__44FF419A"),
                    l => l.HasOne<Factory>().WithMany()
                        .HasForeignKey("FactoryCode")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Offering__Factor__440B1D61"),
                    j =>
                    {
                        j.HasKey("FactoryCode", "OfferCode").HasName("PK__Offering__87D72E4E44BA21F0");
                        j.ToTable("Offering");
                    });

            entity.HasMany(d => d.OfferCodesNavigation).WithMany(p => p.FactoryCodesNavigation)
                .UsingEntity<Dictionary<string, object>>(
                    "ViewingOffer",
                    r => r.HasOne<Offer>().WithMany()
                        .HasForeignKey("OfferCode")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ViewingOf__Offer__412EB0B6"),
                    l => l.HasOne<Factory>().WithMany()
                        .HasForeignKey("FactoryCode")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ViewingOf__Facto__403A8C7D"),
                    j =>
                    {
                        j.HasKey("FactoryCode", "OfferCode").HasName("PK__ViewingO__87D72E4EAF9362CD");
                        j.ToTable("ViewingOffer");
                    });
        });

        modelBuilder.Entity<IndustrialArea>(entity =>
        {
            entity.HasKey(e => e.IareaCode).HasName("PK__Industri__BC8D36571DF3ED0E");

            entity.ToTable("IndustrialArea");

            entity.Property(e => e.IareaCode)
                .ValueGeneratedNever()
                .HasColumnName("IAreaCode");
            entity.Property(e => e.IareaName)
                .HasMaxLength(30)
                .HasColumnName("IAreaName");
            entity.Property(e => e.Ilocation)
                .HasMaxLength(60)
                .HasColumnName("ILocation");
        });

        modelBuilder.Entity<Offer>(entity =>
        {
            entity.HasKey(e => e.OfferCode).HasName("PK__Offer__E6C9FD0C230610CA");

            entity.ToTable("Offer");

            entity.Property(e => e.OfferCode).ValueGeneratedNever();
            entity.Property(e => e.Description).HasColumnType("ntext");
           
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            //entity.Property(e => e.OfferName).HasMaxLength(40);
            entity.Property(e => e.OfferType).HasMaxLength(40);
            entity.Property(e => e.Rating).HasMaxLength(40);
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(40);
            entity.Property(e => e.FactoryAddress).HasMaxLength(255);
            entity.Property(e => e.Quantity).HasMaxLength(25);
            entity.Property(e => e.ContractorRecommend).HasMaxLength(255);

            entity.HasOne(d => d.FactoryCodeNavigation).WithMany(p => p.Offers)
                .HasForeignKey(d => d.FactoryCode)
                .HasConstraintName("FK__Offer__FactoryCo__2C3393D0");

            entity.HasOne(d => d.WasteCodeNavigation).WithMany(p => p.Offers)
                .HasForeignKey(d => d.WasteCode)
                .HasConstraintName("FK__Offer__WasteCode__2D27B809");
        });

        

       

        modelBuilder.Entity<Waste>(entity =>
        {
            entity.HasKey(e => e.WasteCode).HasName("PK__Waste__424CD36F3FBF3BA6");

            entity.ToTable("Waste");

            entity.Property(e => e.WasteCode).ValueGeneratedNever();
            entity.Property(e => e.CollectingDate).HasColumnType("datetime");
            entity.Property(e => e.WasteVal).HasMaxLength(40);
            entity.Property(e => e.WasteType).HasMaxLength(50); // Set the max length for WasteType
            entity.Property(e => e.Quantity).IsRequired(); // Set Quantity as required
            entity.HasOne(d => d.FactoryCodeNavigation).WithMany(p => p.Wastes)
                .HasForeignKey(d => d.FactoryCode)
                .HasConstraintName("FK__Waste__FactoryCo__29572725");
        });

       

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

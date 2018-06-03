using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudAPI.Controllers.Model
{
    public class DbInitializer
    {
        public static void Initialize(LibraryContext context)
        {
            //Create the db if not yet exists
            context.Database.EnsureCreated();

            //Are there already countries present ?
            if (!context.Countries.Any())
            {
                var Europe = new Region()
                {
                    Name = "Europe",
                };
                context.Regions.Add(Europe);

                var America = new Region()
                {
                    Name = "Amrica",
                };
                context.Regions.Add(America);

                //Create new book
                var Spain = new Country()
                {
                    Name = "Spain",
                    Capital = "Madrid",
                    Currency = "Eur",
                    Region = Europe
                    
                };
                //Add the country to the collection of regions
                context.Countries.Add(Spain);

                var UnitedStates = new Country()
                {
                    Name = "United States",
                    Capital = "Washington D.C.",
                    Currency = "Dollar",
                    Region = America
                };
                context.Countries.Add(UnitedStates);

                //Save all the changes to the DB
                context.SaveChanges();
            }
        }
    }
}
}

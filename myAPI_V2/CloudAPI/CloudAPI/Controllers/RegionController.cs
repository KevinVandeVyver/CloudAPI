using CloudAPI.Controllers.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudAPI.Controllers
{
    [Route("api/v1/regions")]
    public class RegionController: Controller
    {
        private readonly LibraryContext context;

        public RegionController(LibraryContext context)
        {
            this.context = context;
        }

        [HttpGet]         // api/v1/regions
        public List<Region> GetAllRegions()
        {
            return context.Regions.ToList();
        }

        [Route("{id}")]   // api/v1/regions/2
        [HttpGet]
        public IActionResult GetRegion(int id)
        {
            var region = context.Regions.Find(id);
            if (region == null)
                return NotFound();

            return Ok(region);
        }

        [Route("{id}/regions")]   // api/v1/regions/2
        [HttpGet]
        public IActionResult GetCountriesInRegion(int id)
        {
            var region = context.Regions
                    .Include(d => d.Countries)
                    .SingleOrDefault(d => d.Id == id);

            if (region == null)
                return NotFound();

            return Ok(region.Countries);
        }

        [HttpPost]
        public IActionResult CreateRegion([FromBody] Region newRegion)
        {
            //Region toevoegen in de databank, Id wordt dan ook toegekend
            context.Regions.Add(newRegion);
            context.SaveChanges();
            // Stuur een result 201 met het region als content
            return Created("", newRegion);
        }

        [HttpPut]
        public IActionResult UpdateRegion([FromBody] Region updateRegion)
        {
            var adjustedRegion = context.Regions.Find(updateRegion.Id);
            if (adjustedRegion == null)
                return NotFound();

            adjustedRegion.Name = updateRegion.Name;

            context.SaveChanges();
            return Ok(adjustedRegion);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteRegion(int id)
        {
            var region = context.Regions.Find(id);
            if (region == null)
                return NotFound();

            //region verwijderen ..
            context.Regions.Remove(region);
            context.SaveChanges();
            //Standaard response 204 bij een gelukte delete
            return NoContent();
        }

    }
}

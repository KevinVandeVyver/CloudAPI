using CloudAPI.Controllers.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudAPI.Controllers
{
    [Route("api/v1/countries")]
    public class CountryController: Controller
    {
        private readonly LibraryContext _ctxt;
        public CountryController(LibraryContext ctxt)
        {
            _ctxt = ctxt;
        }

        [HttpGet]         // api/v1/books
        public List<Country> GetAllCountries(string capital, string name, string currency, int? page, string sort, int length = 2, string dir = "asc")
        {
            IQueryable<Country> query = _ctxt.Countries;

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(d => d.Name == name);
            if (!string.IsNullOrWhiteSpace(capital))
                query = query.Where(d => d.Capital == capital);

            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "name":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Name);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Name);
                        break;
                    case "capital":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Capital);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Capital);
                        break;
                }
            }

            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);

            return query.ToList();
        }

        [Route("{id}")]   // api/v1/country/2
        [HttpGet]
        public IActionResult GetCountry(int id)
        {
            var country = _ctxt.Countries
                    .Include(d => d.Region)
                    .SingleOrDefault(d => d.Id == id);

            if (country == null)
                return NotFound();

            return Ok(country);
        }

        [Route("{id}/region")]   // api/v1/region/2
        [HttpGet]
        public IActionResult GetRegionForCountry(int id)
        {
            var country = _ctxt.Countries
                        .Include(d => d.Region)
                        .SingleOrDefault(d => d.Id == id);
            if (country == null)
                return NotFound();

            return Ok(country.Region);
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult DeleteCountry(int id)
        {
            var country = _ctxt.Countries.Find(id);
            if (country == null)
                return NotFound();

            //country verwijderen ..
            _ctxt.Countries.Remove(country);
            _ctxt.SaveChanges();
            //Standaard response 204 bij een gelukte delete
            return NoContent();
        }

        [HttpPost]
        public IActionResult CreateCountry([FromBody] Country newCountry)
        {
            //Country toevoegen in de databank, Id wordt dan ook toegekend
            _ctxt.Countries.Add(newCountry);
            _ctxt.SaveChanges();
            // Stuur een result 201 met het boek als content
            return Created("", newCountry);
        }

        [HttpPut]
        public IActionResult UpdateCountry([FromBody] Country updateCountry)
        {
            var adjustedCountry = _ctxt.Countries.Find(updateCountry.Id);
            if (adjustedCountry == null)
                return NotFound();

            adjustedCountry.Name = updateCountry.Name;
            adjustedCountry.Capital = updateCountry.Capital;
            adjustedCountry.Currency = updateCountry.Currency;

            _ctxt.SaveChanges();
            return Ok(adjustedCountry);
        }
    }
}

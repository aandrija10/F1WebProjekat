using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormulaController : ControllerBase
    {
        
        public FormulaContext Context  { get; set; }

        public FormulaController(FormulaContext context) {
            Context = context;
        }
        
        [Route("PreuzmiSampionate")]
        [HttpGet]
        public async Task<List<Sampionat>> PreuzmiSampionate() {
            return await Context.Sampionati.Include(p => p.TrkeSezona).ThenInclude(p => p.Vozaci).ToListAsync();
        }

        [Route("PreuzmiSampionat/{id}")]
        [HttpGet]
        public async Task<List<Sampionat>> PreuzmiSampionat(int id) {
            return await Context.Sampionati.Where(el => el.ID == id).Include(p => p.TrkeSezona).ThenInclude(p => p.Vozaci).ToListAsync();
        }

        [Route("PreuzmiTrku/{id}")]
        [HttpGet]
        public async Task<List<Trka>> PreuzmiTrku(int id) {
            return await Context.Trke.Where(trka => trka.ID == id).Include(p => p.Vozaci).ToListAsync();
        }

        [Route("PromeniTrku/{id}")] 
        [HttpPut]
        public async Task PromeniTrku(int id, [FromBody] Trka trka) {

            var staraTrka = await Context.Trke.FindAsync(id);
            staraTrka.Naziv = trka.Naziv;
            await Context.SaveChangesAsync();

        }        

        [Route("ObrisiTrku/{id}")]
        [HttpDelete]
        public async Task<IActionResult> ObrisiTrku(int id){
            Trka t = await Context.Trke.Include(el => el.Vozaci).FirstOrDefaultAsync(c => c.ID == id);
            Context.Trke.Remove(t);
            await Context.SaveChangesAsync();
            return StatusCode(200);
        }


        [Route("DodajVozaca/{idTrke}")]
        [HttpPost]
        public async Task DodajVozaca(int idTrke, [FromBody] Vozac vozac) {
            var trka = await Context.Trke.FindAsync(idTrke);
            vozac.Trka = trka;
            Context.Vozaci.Add(vozac);
            await Context.SaveChangesAsync();
        }
    }   
}

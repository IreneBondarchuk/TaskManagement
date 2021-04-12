using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Categories;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController: BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    }
}
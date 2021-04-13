using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Core;
using Application.Executors;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ExecutorsController : BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<List<Executor>>> GetExecutors([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExecutor(Guid id)
        {
            var result = await Mediator.Send(new Details.Query{Id = id});
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateExecutor(Executor executor)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Executor = executor}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditExecutor(Guid id, Executor executor)
        {
            executor.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Executor = executor}));
        } 
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExecutor(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}
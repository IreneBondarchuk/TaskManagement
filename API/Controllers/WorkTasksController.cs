using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.WorkTasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class WorkTasksController : BaseAPIController
    {
       
        [HttpGet]
        public async Task<ActionResult<List<WorkTask>>> GetWorkTasks([FromQuery]WorkTaskParams param)
        {
            return HandleResult(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkTask>> GetWorkTask(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkTask(WorkTask workTask)
        {
            return HandleResult(await Mediator.Send(new Create.Command{WorkTask = workTask}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditWorkTask(Guid id, WorkTask workTask)
        {
            workTask.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{WorkTask = workTask}));
        } 
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkTask(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}
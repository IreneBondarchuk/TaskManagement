
using System;
using Application.Core;
namespace Application.WorkTasks
{
    public class WorkTaskParams: PagingParams
    {
        public Guid ExecutorId { get; set; }
        public Guid CategoryId {get;set;}
        public string Title {get;set;}
    }

}
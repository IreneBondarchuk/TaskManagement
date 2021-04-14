using System;
using Application.Core;

namespace Application.Executors
{
    public class ExecutorParams: PagingParams
    {
        public bool HasActiveTasks { get; set; }
        public string Surname {get;set;}
    }
}
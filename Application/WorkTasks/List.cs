using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;

namespace Application.WorkTasks
{
    public class List
    {
        public class Query : IRequest<Result<List<WorkTask>>> 
        {
            public WorkTaskParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<WorkTask>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<WorkTask>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Tasks
                    .Include(t => t.Executor)
                    .Include(c => c.Category)
                    .Where(t => string.IsNullOrWhiteSpace(request.Params.Title) || t.Title.Contains(request.Params.Title))
                    .Where(t => request.Params.CategoryId == default(Guid) || t.CategoryId == request.Params.CategoryId)
                    .Where(t => request.Params.ExecutorId == default(Guid) || t.ExecutorId == request.Params.ExecutorId)
                    .ToListAsync<WorkTask>();
            

                return Result<List<WorkTask>>.Success(result);
            }
        }
    }
}
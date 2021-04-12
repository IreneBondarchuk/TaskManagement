using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkTasks
{
    public class List
    {
        public class Query : IRequest<Result<List<WorkTask>>> { }

        public class Handler : IRequestHandler<Query, Result<List<WorkTask>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<WorkTask>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<WorkTask>>.Success(await _context.Tasks.ToListAsync());
            }
        }
    }
}
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Executors
{
    public class List
    {
        public class Query : IRequest<Result<List<Executor>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Executor>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Executor>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Executor>>.Success(await _context.Executors.ToListAsync());
            }
        }
    }
}
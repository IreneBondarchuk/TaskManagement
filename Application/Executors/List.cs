using System.Collections.Generic;
using System.Linq;
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
        public class Query : IRequest<Result<PagedList<Executor>>>
         {
              public ExecutorParams Params { get; set; }
         }
        public class Handler : IRequestHandler<Query, Result<PagedList<Executor>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<PagedList<Executor>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Executors
                .Include(t => t.Tasks)
                .Where(x => request.Params.Surname == null || x.FirstName.Contains(request.Params.Surname) || x.Surname.Contains(request.Params.Surname))
                .OrderBy(x => x.FirstName)
                .ThenBy(x => x.Surname)
                .AsQueryable();
                
                if(request.Params.HasActiveTasks){
                    query = query.Where(x => x.Tasks.Any(t => t.Status == 2));
                }

                return Result<PagedList<Executor>>.Success(
                    await PagedList<Executor>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}
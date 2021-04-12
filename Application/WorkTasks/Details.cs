using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.WorkTasks
{
    public class Details
    {
        public class Query : IRequest<Result<WorkTask>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<WorkTask>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<WorkTask>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<WorkTask>.Success(await _context.Tasks.FindAsync(request.Id));
            }
        }
    }
}
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Executors
{
    public class Details
    {
        public class Query : IRequest<Result<Executor>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Executor>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Executor>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<Executor>.Success(await _context.Executors.FindAsync(request.Id));
            }
        }
    }
}
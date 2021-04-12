using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Executors
{
    public class Edit : IRequest
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Executor Executor { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Executor).SetValidator(new ExecutorValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var executor = await _context.Executors.FindAsync(request.Executor.Id);
                if(executor == null) return null;
                _mapper.Map(request.Executor, executor);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update executor");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
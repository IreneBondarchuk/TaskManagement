using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.WorkTasks
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public WorkTask WorkTask { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.WorkTask).SetValidator(new WorkTaskValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                request.WorkTask.Category = null;
                request.WorkTask.Executor = null;
                _context.Tasks.Add(request.WorkTask);
                
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to create task");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
using Domain;
using FluentValidation;

namespace Application.Executors
{
    public class ExecutorValidator : AbstractValidator<Executor>
    {
        public ExecutorValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Surname).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Email).EmailAddress().MaximumLength(50);
            RuleFor(x => x.Job).NotEmpty().MinimumLength(5).MaximumLength(100);
        }
    }
}
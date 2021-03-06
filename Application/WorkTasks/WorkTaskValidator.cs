using System;
using Domain;
using FluentValidation;

namespace Application.WorkTasks
{
    public class WorkTaskValidator : AbstractValidator<WorkTask>
    {
        public WorkTaskValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Description).NotEmpty().MinimumLength(10);
            RuleFor(x => x.Deadline).GreaterThan(d => DateTime.Today).WithMessage("The deadline can't be earlier than tomorrow");
            RuleFor(x => x.CategoryId).NotEmpty().WithMessage("'Category' must not be empty.");;
        }
    }
}
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
            RuleFor(x => x.Deadline).GreaterThan(d => DateTime.Today.AddDays(1)).WithMessage("The deadline can't be earlier than tomorrow");
        }
    }
}
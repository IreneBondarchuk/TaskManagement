using System;

namespace Domain
{
    public class WorkTask
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Executor Executor { get; set; }
        public DateTime Deadline { get; set; }
        public int Status { get; set; }

        public Category Category { get; set; }
    }
}
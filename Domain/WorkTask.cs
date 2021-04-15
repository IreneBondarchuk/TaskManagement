using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class WorkTask
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
       
        public DateTime? Deadline { get; set; }
        public int Status { get; set; }

        public Guid? ExecutorId { get; set; }
        [ForeignKey("ExecutorId")]
        public Executor Executor { get; set; }
        public Guid? CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
    }
}
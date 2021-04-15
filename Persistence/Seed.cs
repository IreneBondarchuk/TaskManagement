using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Task = System.Threading.Tasks.Task;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(!context.Categories.Any()){
                var categories = new List<Category>
                {
                    new Category  {Id =  new Guid(), Title = "Task"},
                    new Category  {Id =  new Guid(), Title = "Analyze"},
                    new Category  {Id =  new Guid(), Title = "Development"},
                    new Category  {Id =  new Guid(), Title = "Test"},
                    new Category  {Id =  new Guid(), Title = "Deploy"},
                    new Category  {Id =  new Guid(), Title = "Document"}
                };
                await context.Categories.AddRangeAsync(categories);
                await context.SaveChangesAsync();
            }
            if (!context.Executors.Any()) {
                var employees = new List<Executor>
                {
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Michael",
                        Surname = "Scott",
                        Email = "rub.scott@office.com",
                        PhoneNumber = "096-777-77-77",
                        HiringDate = new DateTime(1995, 12, 01),
                        Job = "CEO"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Dwight",
                        Surname = "Schrute",
                        Email = "arg.schrute@office.com",
                        PhoneNumber = "096-666-66-66",
                        HiringDate = new DateTime(1995, 01, 01),
                        Job = "Project Manager"
                        
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Jim",
                        Surname = "Halpert",
                        Email = "rem.lupin@office.com",
                        PhoneNumber = "096-555-55-5",
                        HiringDate = new DateTime(1998, 12, 01),
                        Job = ".Net developer"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Pam",
                        Surname = "Beasley",
                        Email = "mnv.Beasley@office.com",
                        PhoneNumber = "096-777-77-77",
                        HiringDate = new DateTime(1995, 12, 01),
                        Job = "Help Desk Analyst"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Stanley",
                        Surname = "Hudson",
                        Email = "sev.Hudson@office.com",
                        PhoneNumber = "096-111-11-11",
                        HiringDate = new DateTime(1992, 07, 01),
                        Job = "Network Administrator/Engineer"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Phyllis",
                        Surname = "Lapin",
                        Email = "irm.Lapin@office.com",
                        PhoneNumber = "096-777-77-77",
                        HiringDate = new DateTime(1995, 12, 01),
                        Job = "Business Analyst"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Angela",
                        Surname = "Martin",
                        Email = "alb.Martin@office.com",
                        PhoneNumber = "096-222-22-22",
                        HiringDate = new DateTime(1980, 05, 01),
                        Job = "IT Project Manager"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Oscar",
                        Surname = "Gutierrez",
                        Email = "rol.Gutierrez@office.com",
                        PhoneNumber = "096-333-33-33",
                        HiringDate = new DateTime(1998, 12, 01),
                        Job = "IT Project Manager"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Kevin",
                        Surname = "Malone",
                        Email = "al.Malone@office.com",
                        PhoneNumber = "096-444-44-44",
                        HiringDate = new DateTime(2000, 12, 01),
                        Job = "Business Analyst"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Erin",
                        Surname = "Hannon",
                        Email = "rem.Hannon@office.com",
                        PhoneNumber = "096-555-55-5",
                        HiringDate = new DateTime(1998, 12, 01),
                        Job = ".Net developer"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Ryan",
                        Surname = "Howard",
                        Email = "mnv.Beasley@office.com",
                        PhoneNumber = "096-777-77-77",
                        HiringDate = new DateTime(1995, 12, 01),
                        Job = "Help Desk Analyst"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Gabe",
                        Surname = "Lewis",
                        Email = "sev.Lewis@office.com",
                        PhoneNumber = "096-111-11-11",
                        HiringDate = new DateTime(1992, 07, 01),
                        Job = "Network Administrator/Engineer"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Kelly",
                        Surname = "Kapoor",
                        Email = "irm.Flenderson@office.com",
                        PhoneNumber = "096-777-77-77",
                        HiringDate = new DateTime(1995, 12, 01),
                        Job = "Business Analyst"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Andy",
                        Surname = "Bernard",
                        Email = "alb.Bernard@office.com",
                        PhoneNumber = "096-222-22-22",
                        HiringDate = new DateTime(1980, 05, 01),
                        Job = "IT Project Manager"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Meredith",
                        Surname = "Palmer",
                        Email = "rol.Palmer@office.com",
                        PhoneNumber = "096-333-33-33",
                        HiringDate = new DateTime(1998, 12, 01),
                        Job = "IT Project Manager"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Creed",
                        Surname = "Bratton",
                        Email = "al.Bratton@office.com",
                        PhoneNumber = "096-444-44-44",
                        HiringDate = new DateTime(2000, 12, 01),
                        Job = "Business Analyst"
                    }
                };
                await context.Executors.AddRangeAsync(employees);
                await context.SaveChangesAsync();
            }
                
            return;
        }
    }
}
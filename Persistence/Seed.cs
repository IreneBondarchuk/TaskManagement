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
            if (!context.Executors.Any()) {
                var employees = new List<Executor>
                {
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Rubeus",
                        Surname = "Hagrid",
                        Email = "rub.hagrid@hogwarts.com",
                        PhoneNumber = "096-777-77-77",
                        HiringDate = new DateTime(1995, 12, 01),
                        Job = "Keeper of Keys and Grounds"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Argus",
                        Surname = "Filch",
                        Email = "arg.filch@hogwarts.com",
                        PhoneNumber = "096-666-66-66",
                        HiringDate = new DateTime(1995, 01, 01),
                        Job = "Caretaker"
                        
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Remus",
                        Surname = "Lupin",
                        Email = "rem.lupin@hogwarts.com",
                        PhoneNumber = "096-555-55-5",
                        HiringDate = new DateTime(1998, 12, 01),
                        Job = "Defence Against the Dark Arts"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Minerva",
                        Surname = "McGonagall",
                        Email = "mnv.mcgonagall@hogwarts.com",
                        PhoneNumber = "096-777-77-77",
                        HiringDate = new DateTime(1995, 12, 01),
                        Job = "Transfiguration"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Severus",
                        Surname = "Snape",
                        Email = "sev.snape@hogwarts.com",
                        PhoneNumber = "096-111-11-11",
                        HiringDate = new DateTime(1992, 07, 01),
                        Job = "Defense Against the Dark Arts"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Irma",
                        Surname = "Pince",
                        Email = "irm.pince@hogwarts.com",
                        PhoneNumber = "096-777-77-77",
                        HiringDate = new DateTime(1995, 12, 01),
                        Job = "Librarian"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Albus",
                        Surname = "Dumbledore",
                        Email = "alb.dumbl@hogwarts.com",
                        PhoneNumber = "096-222-22-22",
                        HiringDate = new DateTime(1980, 05, 01),
                        Job = "Headmaster"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Rolanda",
                        Surname = "Hooch",
                        Email = "rol.hooch@hogwarts.com",
                        PhoneNumber = "096-333-33-33",
                        HiringDate = new DateTime(1998, 12, 01),
                        Job = "Flying"
                    },
                    new Executor
                    {
                        Id = new Guid(),
                        FirstName = "Alastor",
                        Surname = "Moody",
                        Email = "al.moody@hogwarts.com",
                        PhoneNumber = "096-444-44-44",
                        HiringDate = new DateTime(2000, 12, 01),
                        Job = "Defence Against the Dark Arts"
                    }
                };
                await context.Executors.AddRangeAsync(employees);
                await context.SaveChangesAsync();
            }
            
            if (!context.Tasks.Any()) 
             {  
                var tasks = new List<WorkTask>
            {
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "Dementors",
                    Description = "Prepare a thesis about Dementors",
                    Deadline = DateTime.Today.AddDays(2),
                     Status = 3
                },
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "Help Harry Potter",
                    Description = "locating Harry Potter, helping him to find his bearings in the wizarding world and to buy his school things",
                    Deadline = DateTime.Today.AddDays(14),
                    Status = 3
                },
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "Spy on students",
                    Description = "spy on students engaging in suspicious activity or out of bed after curfew",
                    Deadline = DateTime.Today.AddDays(20),
                    Status = 3
                },
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "reformation of Dumbledore's Army",
                    Description = "assist the reformation of Dumbledore's Army under the new leadership of Neville, Ginny and Seamus Finnigan and helped to ensure that their meetings were kept secret",
                    Deadline = DateTime.Today.AddDays(7),
                     Status = 3
                    
                },
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "Transfer Harry",
                    Description = "lead the party transferring Harry from 4 Privet Drive to Number 12 Grimmauld Place",
                    Deadline = DateTime.Today.AddDays(12),
                    Status = 3
                },
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "Help Dumbledore",
                    Description = "slow the spread of the curse from Dumbledore's hand through his body",
                    Deadline = DateTime.Today.AddDays(3),
                     Status = 3
                },
                 new WorkTask
                { 
                    Id = new Guid(),
                    Title = "Dementors",
                    Description = "Prepare a thesis about Dementors",
                    Deadline = DateTime.Today.AddDays(2),
                     Status = 2
                },
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "Help Harry Potter",
                    Description = "locating Harry Potter, helping him to find his bearings in the wizarding world and to buy his school things",
                    Deadline = DateTime.Today.AddDays(14),
                    Status = 2
                },
                new WorkTask
                { 
                    Id = new Guid(),                  
                    Title = "Spy on students",
                    Description = "spy on students engaging in suspicious activity or out of bed after curfew",
                    Deadline = DateTime.Today.AddDays(20),
                    Status = 2
                },
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "reformation of Dumbledore's Army",
                    Description = "assist the reformation of Dumbledore's Army under the new leadership of Neville, Ginny and Seamus Finnigan and helped to ensure that their meetings were kept secret",
                    Deadline = DateTime.Today.AddDays(7),
                     Status = 2
                    
                },
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "Transfer Harry",
                    Description = "lead the party transferring Harry from 4 Privet Drive to Number 12 Grimmauld Place",
                    Deadline = DateTime.Today.AddDays(12),
                    Status = 2
                },
                new WorkTask
                { 
                    Id = new Guid(),
                    Title = "Help Dumbledore",
                    Description = "slow the spread of the curse from Dumbledore's hand through his body",
                    Deadline = DateTime.Today.AddDays(3),
                     Status = 2
                }
                
            };
                await context.Tasks.AddRangeAsync(tasks);
                await context.SaveChangesAsync();
             }        
            return;
        }
    }
}
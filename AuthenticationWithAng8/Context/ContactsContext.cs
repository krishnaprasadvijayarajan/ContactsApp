using EmployeeServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
 

namespace EmployeeServer.Context
{
    public class ContactsContext : DbContext
    {
        public ContactsContext(DbContextOptions<ContactsContext> options) : base(options)
        {
        }
        public DbSet<Contact> Contact { get; set; }

        
    }
}

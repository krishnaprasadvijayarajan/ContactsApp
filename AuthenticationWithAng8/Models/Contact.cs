using System; 
using System.ComponentModel.DataAnnotations;

namespace EmployeeServer.Models
{
    public class Contact
    {
        [Key]
        public int? ContactID { get; set; }
        public string? UserId { get; set; }
        public string ContactName { get; set; }
        public string Address { get; set; }
    }
}

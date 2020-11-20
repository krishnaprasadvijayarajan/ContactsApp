using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using EmployeeServer.Context;
using EmployeeServer.Models;
using log4net;
using log4net.Repository.Hierarchy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Scope;
using NLog.Web;

namespace EmployeeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        //Logger log = LogManager.GetCurrentClassLogger();
        //private static readonly ILog log = LogManager.GetLogger(typeof(ContactsController));
        //private readonly ILogger<ContactsController> logger;
        NLog.Logger logger;
        readonly ContactsContext ContactDetails;
        public ContactsController(ContactsContext employeeContext)
            //,ILogger<ContactsController> logger
        {
            ContactDetails = employeeContext;
            //this.logger = logger;
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
    }

        //[HttpGet]
        //public IEnumerable<Contact> Get()
        //{
        //    var data = ContactDetails.Contact.ToList();
        //    return data;
        //}

        [HttpGet]
        public IEnumerable<Contact> GetContactsForLoggedInUser(string userId)
        {
            //logger.LogInformation("this is the new log - get contacts for loggedin user");
            logger.Info("this is the new log - get contacts for loggedin user");            
            var data = ContactDetails.Contact.Where(c => c.UserId == userId).ToList();
            return data;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contact obj)
        {
            var data = ContactDetails.Contact.Add(obj);
            ContactDetails.SaveChanges();
            return Ok();
        }
        
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Contact obj)
        {
            var data = ContactDetails.Contact.Update(obj);
            ContactDetails.SaveChanges();
            return Ok();
        }

        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var data = ContactDetails.Contact.Where(a => a.ContactID == id).FirstOrDefault();
            ContactDetails.Contact.Remove(data);
            ContactDetails.SaveChanges();
            return Ok();

        }
    }
}
 
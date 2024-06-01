using ClassLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Runtime.CompilerServices;
using WebApplication.DTO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Controllers
{
    [Route("api/[controller]")] //שתי פעולות => כניסה והרשמה למערכת
    [ApiController]
    public class FactoryController : ControllerBase
    {
        SwitchContext db = new SwitchContext();
       
        [HttpPost]
        [Route("SignIn")] //כניסה לאתר
        public IActionResult Post([FromBody] UserFactoryLogDTO user)//נסיון להשוות בין מה שקיבלנו מהמשתמש לדאטה בייס ולראות 
        {
            try
            {
                var factoryUser = db.Factories.FirstOrDefault(x => x.FactoryCode == user.FactoryCode && x.Password == user.Password);
                if(factoryUser != null) { //בדיקה האם המשתמש נמצא בדאטה בייס לפי ח.פ וסיסמא
               
                    return Ok(factoryUser.FactoryName);
                }
                else
                {
                    return NotFound("User not found or password incorrect");
                }
               
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
           
        [HttpPost]
        [Route("Register")]//הרשמה למערכת  
        public dynamic Post([FromBody] FactoryDTO newFactory)
        {
            try
            {
                Factory f1 = new Factory();
                f1.FactoryName = newFactory.FactoryName;
                f1.Email = newFactory.Email;
                f1.Password = newFactory.Password;
                f1.FactoryPhone = newFactory.FactoryPhone;
                f1.FactoryCode = newFactory.FactoryCode;
                f1.FactoryAddress = newFactory.FactoryAddress; 
                f1.FactoryType = newFactory.FactoryType; 
                db.Factories.Add(f1);
                db.SaveChanges();
                return Ok(f1);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }      
               
    }
}

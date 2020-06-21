using System.Threading.Tasks;
using FilmLibraryTest.BL.Account;
using FilmLibraryTest.ViewModels;
using FilmLibraryTest.ViewModels.Request;
using FilmLibraryTest.ViewModels.Response;
using Microsoft.AspNetCore.Mvc;

namespace FilmLibraryTest.Controllers
{
    [Route("api")]
    public class AccountController : ControllerBase
    {
        private readonly Register _register;
        private readonly Login _login;
        private readonly GetUserToToken _getUserToToken;

        public AccountController(Register register, Login login, GetUserToToken getUserToToken)
        {
            _register = register;
            _login = login;
            _getUserToToken = getUserToToken;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IResultModel<string>> Register([FromBody] RegisterViewModel model)
        {
            return await _register.GetResult(model);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IResultModel<UserLoginViewModel>> Login([FromBody] LoginViewModel model)
        {
            return await _login.GetResult(model);
        }
        
        [HttpPost]
        [Route("getUserToToken")]
        public async Task<IResultModel<UserLoginViewModel>> GetUserToToken([FromBody] UserToTokenViewModel model)
        {
            return await _getUserToToken.GetResult(model);
        }
    }
}
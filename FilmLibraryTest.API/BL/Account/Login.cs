using System;
using System.Linq;
using System.Threading.Tasks;
using FilmLibraryTest.Contexts;
using FilmLibraryTest.Models.Identity;
using FilmLibraryTest.ViewModels;
using FilmLibraryTest.ViewModels.Request;
using FilmLibraryTest.ViewModels.Response;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FilmLibraryTest.BL.Account
{
    public class Login : IBusinessLogic<LoginViewModel, IResultModel<UserLoginViewModel>>
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationContext _ctx;

        public Login(UserManager<User> userManager, ApplicationContext ctx)
        {
            _userManager = userManager;
            _ctx = ctx;
        }

        public async Task<IResultModel<UserLoginViewModel>> GetResult(LoginViewModel model)
        {
            var result = new UserResponseViewModel {Error = null, Result = new UserLoginViewModel()};

            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null) throw new Exception("Пользователь не найден");

                var isPasswordOk = await _userManager.CheckPasswordAsync(user, model.Password);

                if (!isPasswordOk) throw new Exception("Пароль введен не верно");
                result.Result.Token = _ctx.Tokens.Include(u => u.User).FirstOrDefault(x => x.User.Id == user.Id)?.Value;
                result.Result.Name = user.UserName;
            }
            catch (Exception e)
            {
                result.Error = e.Message;
            }

            return result;
        }
    }
}
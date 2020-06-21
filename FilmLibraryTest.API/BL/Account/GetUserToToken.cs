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
    public class GetUserToToken: IBusinessLogic<UserToTokenViewModel, IResultModel<UserLoginViewModel>>
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationContext _ctx;

        public GetUserToToken(UserManager<User> userManager, ApplicationContext ctx)
        {
            _userManager = userManager;
            _ctx = ctx;
        }

        public async Task<IResultModel<UserLoginViewModel>> GetResult(UserToTokenViewModel model)
        {
            var result = new UserResponseViewModel {Error = null, Result = new UserLoginViewModel()};

            try
            {
                var token = await _ctx.Tokens.Include(u => u.User).FirstOrDefaultAsync(x => x.Value == model.Token);
                var user = token.User;
                
                if (user == null) throw new Exception("Пользователь не найден");

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
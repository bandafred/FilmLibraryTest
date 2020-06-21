using System;
using System.Linq;
using System.Threading.Tasks;
using FilmLibraryTest.Contexts;
using FilmLibraryTest.Helper;
using FilmLibraryTest.Models.Identity;
using FilmLibraryTest.ViewModels;
using FilmLibraryTest.ViewModels.Request;
using FilmLibraryTest.ViewModels.Response;
using Microsoft.AspNetCore.Identity;

namespace FilmLibraryTest.BL.Account
{
    public class Register : IBusinessLogic<RegisterViewModel, IResultModel<string>>
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationContext _ctx;

        public Register(UserManager<User> userManager, ApplicationContext ctx)
        {
            _userManager = userManager;
            _ctx = ctx;
        }

        public async Task<IResultModel<string>> GetResult(RegisterViewModel model)
        {
            var result = new StringResponseViewModel();

            try
            {
                var userAdd = new User {Email = model.Email, UserName = model.Email};

                // добавляем пользователя
                var addUser = await _userManager.CreateAsync(userAdd, model.Password);

                if (!addUser.Succeeded) throw new Exception(addUser.Errors.First().Description);

                // добавляем токен
                var user = await _userManager.FindByEmailAsync(model.Email);
                var token = AutoGenerateSymbol.GetSymbols(300);
                var userTokens = new Token {User = user, Value = token};

                await _ctx.Tokens.AddAsync(userTokens);
                await _ctx.SaveChangesAsync();

                result.Result = token;
            }
            catch (Exception e)
            {
                result.Error = e.Message;
            }

            return result;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilmLibraryTest.Contexts;
using FilmLibraryTest.ViewModels;
using FilmLibraryTest.ViewModels.Response;
using Microsoft.EntityFrameworkCore;

namespace FilmLibraryTest.BL.Film
{
    public class GetMyFilms : IBusinessLogic<(int skip, int take, string token), IResultModel<ListFilm>>
    {
        private readonly ApplicationContext _ctx;

        public GetMyFilms(ApplicationContext ctx)
        {
            _ctx = ctx;
        }


        public async Task<IResultModel<ListFilm>> GetResult((int skip, int take, string token) input)
        {
            var result = new ListFilmsResponseViewModel {Result = new ListFilm()};
            try
            {
                var user = _ctx.Tokens.Include(u => u.User).FirstOrDefault(x => x.Value == input.token)?.User;

                if (user == null) throw new Exception("Пользователь не найден");
                var films = await _ctx.Films.Where(x => x.User.Id == user.Id).Skip(input.skip).Take(input.take)
                    .AsNoTracking().ToListAsync();

                var listFilms = films.Select(item => new FilmViewModel
                    {
                        Description = item.Description,
                        Id = item.Id,
                        Producer = item.Producer,
                        Title = item.Title,
                        Year = item.Year,
                        UserName = user.UserName
                    })
                    .ToList();

                result.Result.Films = listFilms;

                result.Result.TotalCount = _ctx.Films.Count(x => x.User.Id == user.Id);
            }
            catch (Exception e)
            {
                result.Error = e.Message;
            }

            return result;
        }
    }
}
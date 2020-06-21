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
    public class GetAllFilms : IBusinessLogic<(int skip, int take), IResultModel<ListFilm>>
    {
        private readonly ApplicationContext _ctx;

        public GetAllFilms(ApplicationContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IResultModel<ListFilm>> GetResult((int skip, int take) input)
        {
            var result = new ListFilmsResponseViewModel {Result = new ListFilm()};
            try
            {
                var films = await _ctx.Films.Skip(input.skip).Take(input.take).Include(u => u.User).AsNoTracking()
                    .ToListAsync();
                var listFilms = films.Select(item => new FilmViewModel
                    {
                        Description = item.Description,
                        Id = item.Id,
                        Producer = item.Producer,
                        Title = item.Title,
                        Year = item.Year,
                        UserName = item.User.UserName
                    })
                    .ToList();

                result.Result.Films = listFilms;


                result.Result.TotalCount = _ctx.Films.Count();
            }
            catch (Exception e)
            {
                result.Error = e.Message;
            }

            return result;
        }
    }
}
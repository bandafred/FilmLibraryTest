using System;
using System.Threading.Tasks;
using FilmLibraryTest.Contexts;
using FilmLibraryTest.ViewModels;
using FilmLibraryTest.ViewModels.Response;
using Microsoft.EntityFrameworkCore;

namespace FilmLibraryTest.BL.Film
{
    public class GetPhoto : IBusinessLogic<int, IResultModel<string>>
    {
        private readonly ApplicationContext _ctx;

        public GetPhoto(ApplicationContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IResultModel<string>> GetResult(int id)
        {
            var result = new StringResponseViewModel();

            try
            {
                var film = await _ctx.Films.FirstOrDefaultAsync(x => x.Id == id);
                result.Result = film.PosterUrl;
            }
            catch (Exception e)
            {
                result.Error = e.Message;
            }

            return result;
        }
    }
}
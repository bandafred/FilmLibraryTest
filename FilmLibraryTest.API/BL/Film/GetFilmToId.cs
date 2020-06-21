using System;
using System.Threading.Tasks;
using FilmLibraryTest.Contexts;
using FilmLibraryTest.ViewModels;
using FilmLibraryTest.ViewModels.Response;
using Microsoft.EntityFrameworkCore;

namespace FilmLibraryTest.BL.Film
{
    public class GetFilmToId : IBusinessLogic<int, IResultModel<Models.Film>>
    {
        private readonly ApplicationContext _ctx;

        public GetFilmToId(ApplicationContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IResultModel<Models.Film>> GetResult(int id)
        {
            var result = new FilmResponseViewModel();
            try
            {
                result.Result = await _ctx.Films.FirstAsync(x => x.Id == id);
            }
            catch (Exception e)
            {
                result.Error = e.Message;
            }

            return result;
        }
    }
}
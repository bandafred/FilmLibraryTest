using System;
using System.Linq;
using System.Threading.Tasks;
using FilmLibraryTest.Contexts;
using FilmLibraryTest.ViewModels;
using FilmLibraryTest.ViewModels.Response;
using Microsoft.EntityFrameworkCore;

namespace FilmLibraryTest.BL.Film
{
    public class DeleteFilmToId: IBusinessLogic<(int id, string token), IResultModel<string>>
    {
        private readonly ApplicationContext _ctx;

        public DeleteFilmToId(ApplicationContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IResultModel<string>> GetResult((int id, string token) input)
        {
            var result = new StringResponseViewModel();

            try
            {
                var userId =  _ctx.Tokens.Include(u => u.User).FirstOrDefault(x => x.Value == input.token)?.User.Id;
                if(userId == null) throw new Exception("Пользователь не найден");
                var film = await _ctx.Films.FirstOrDefaultAsync(x => x.Id == input.id && x.User.Id == userId);
                
                if(film == null) throw new Exception("Фильм не найден");
                _ctx.Remove(film);
                await _ctx.SaveChangesAsync();
                result.Result = "Фильм успешно удален";
            }
            catch (Exception e)
            {
                result.Error = e.Message;
            }

            return result;

        }
    }
}
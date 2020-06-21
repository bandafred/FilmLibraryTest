using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FilmLibraryTest.Contexts;
using FilmLibraryTest.ViewModels;
using FilmLibraryTest.ViewModels.Request;
using FilmLibraryTest.ViewModels.Response;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace FilmLibraryTest.BL.Film
{
    public class AddFilm : IBusinessLogic<(IFormFile file, FilmRequestViewModel model), IResultModel<string>>
    {
        private readonly ApplicationContext _ctx;
        IWebHostEnvironment _appEnvironment;

        public AddFilm(ApplicationContext ctx, IWebHostEnvironment appEnvironment)
        {
            _ctx = ctx;
            _appEnvironment = appEnvironment;
        }

        public async Task<IResultModel<string>> GetResult((IFormFile file, FilmRequestViewModel model) input)
        {
            var result = new StringResponseViewModel();
            var path = $"Common\\Posters\\unnamed.png";
            //получить пользователя по токену
            var user = _ctx.Tokens.Include(u => u.User).FirstOrDefault(x => x.Value == input.model.Token)?.User;
            if (user == null) throw new Exception("Пользователь не найден");

            var dirInfo = new DirectoryInfo($"Common\\Posters\\{user.UserName}\\{DateTime.Now.ToShortDateString()}");
            if (!dirInfo.Exists) dirInfo.Create();
            

            if (input.file?.Name != null)
            {
                path = _appEnvironment.WebRootPath + $"Common\\Posters\\{user.UserName}\\{DateTime.Now.ToShortDateString()}\\{input.file.FileName}";
                // сохраняем файл в папку Common\Posters\
                await using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await input.file.CopyToAsync(fileStream);
                }
            }

            var filmOld = _ctx.Films.FirstOrDefault(x => x.Id == input.model.Id);
            if (filmOld == null)
            {
                var film = new Models.Film
                {
                    Id = input.model.Id,
                    Description = input.model.Description,
                    Producer = input.model.Producer,
                    Title = input.model.Title,
                    Year = input.model.Year,
                    User = user,
                    PosterUrl = path
                };
                await _ctx.Films.AddAsync(film);
                result.Result = "Фильм успешно добавлен";
            }

            else
            {
                filmOld.Description = input.model.Description;
                filmOld.Producer = input.model.Producer;
                filmOld.Title = input.model.Title;
                filmOld.Year = input.model.Year;
                filmOld.PosterUrl = path;

                _ctx.Films.Update(filmOld);
                result.Result = "Данные фильма успешно изменены";
            }

            await _ctx.SaveChangesAsync();

            return result;
        }
    }
}
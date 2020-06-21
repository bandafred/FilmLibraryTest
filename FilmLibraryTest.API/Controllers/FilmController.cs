using System.Threading.Tasks;
using FilmLibraryTest.BL.Film;
using FilmLibraryTest.Models;
using FilmLibraryTest.ViewModels;
using FilmLibraryTest.ViewModels.Request;
using FilmLibraryTest.ViewModels.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmLibraryTest.Controllers
{
    [Route("api")]
    public class FilmController : ControllerBase
    {
        private readonly AddFilm _addFilm;
        private readonly GetPhoto _getPhoto;
        private readonly GetAllFilms _getAllFilms;
        private readonly GetMyFilms _getMyFilms;
        private readonly GetFilmToId _getFilmToId;
        private readonly DeleteFilmToId _deleteFilmToId;

        public FilmController(AddFilm addFilm, GetPhoto getPhoto, GetAllFilms getAllFilms, GetMyFilms getMyFilms,
            GetFilmToId getFilmToId, DeleteFilmToId deleteFilmToId)
        {
            _addFilm = addFilm;
            _getPhoto = getPhoto;
            _getAllFilms = getAllFilms;
            _getMyFilms = getMyFilms;
            _getFilmToId = getFilmToId;
            _deleteFilmToId = deleteFilmToId;
        }

        //Добавление фильма
        //Редактирование фильма
        [HttpPost]
        [Route("AddFilm")]
        public async Task<IResultModel<string>> AddFilm(IFormFile file, FilmRequestViewModel model)
        {
            return await _addFilm.GetResult((file, model));
        }

        //Получение фото
        [HttpGet]
        [Route("GetPhoto")]
        public async Task<ActionResult> GetPhoto(int id)
        {
            return File(await System.IO.File.ReadAllBytesAsync(_getPhoto.GetResult(id).Result.Result), "image/jpeg");
        }

        //Просмотр всех фильмов
        [HttpGet]
        [Route("GetAllFilms")]
        public async Task<IResultModel<ListFilm>> GetAllFilms(int skip = 0, int take = 100)
        {
            return await _getAllFilms.GetResult((skip, take));
        }

        //Просмотр своих фильмов
        [HttpGet]
        [Route("GetMyFilms")]
        public async Task<IResultModel<ListFilm>> GetMyFilms(int skip = 0, int take = 100, string token = "")
        {
            return await _getMyFilms.GetResult((skip, take, token));
        }

        //Получить фильм по ИД
        [HttpGet]
        [Route("GetFilmToId")]
        public async Task<IResultModel<Film>> GetFilmToId(int id)
        {
            return await _getFilmToId.GetResult(id);
        }

        //Удаление фильма фильма
        [HttpDelete]
        [Route("DeleteFilmToId")]
        public async Task<IResultModel<string>> DeleteFilmToId(int id, string token)
        {
            return await _deleteFilmToId.GetResult((id, token));
        }
    }
}
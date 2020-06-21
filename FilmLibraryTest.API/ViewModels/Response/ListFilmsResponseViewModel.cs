using System.Collections.Generic;
using System.Linq;
using FilmLibraryTest.Models;

namespace FilmLibraryTest.ViewModels.Response
{
    public class ListFilmsResponseViewModel : IResultModel<ListFilm>
    {
        public string Error { get; set; }
        public ListFilm Result { get; set; }
    }

    public class ListFilm
    {
        public List<FilmViewModel> Films { get; set; }

        public int TotalCount { get; set; }
    }

    public class FilmViewModel
    {
        /// <summary>
        /// Идентификатор фильма.
        /// </summary>
        public int Id { get; set; }
        
        /// <summary>
        /// Название фильма.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Год выпуска.
        /// </summary>
        public int Year { get; set; }

        /// <summary>
        /// Режиссёр.
        /// </summary>
        public string Producer { get; set; }

        /// <summary>
        /// Имя пользователя, добавившего фильм.
        /// </summary>
        public string UserName { get; set; }
    }
}
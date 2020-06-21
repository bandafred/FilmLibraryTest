using FilmLibraryTest.Models.Identity;

namespace FilmLibraryTest.Models
{
    public class Film
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
        /// Путь с картинке постера.
        /// </summary>
        public string PosterUrl { get; set; }

        /// <summary>
        /// Пользователь, который выложил информацию.
        /// </summary>
        public User? User { get; set; }
    }
}
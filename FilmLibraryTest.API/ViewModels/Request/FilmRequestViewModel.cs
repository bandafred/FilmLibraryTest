namespace FilmLibraryTest.ViewModels.Request
{
    public class FilmRequestViewModel
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
        /// Токен пользователя.
        /// </summary>
        public string Token { get; set; }
    }
}
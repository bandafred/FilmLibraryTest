namespace FilmLibraryTest.Models.Identity
{
    /// <summary>
    /// Токен пользователя.
    /// </summary>
    public class Token
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Значение токена.
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// Ссылка на пользователя.
        /// </summary>
        public User User { get; set; }
    }
}
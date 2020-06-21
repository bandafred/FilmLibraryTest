using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace FilmLibraryTest.Models.Identity
{
    public class User : IdentityUser
    {
        /// <summary>
        /// Список токенов пользователя.
        /// </summary>
        public List<Token> Tokens { get; set; }
        
        /// <summary>
        /// Список фильмов, добавленных пользователем.
        /// </summary>
        public List<Film> Films { get; set; }
    }
}
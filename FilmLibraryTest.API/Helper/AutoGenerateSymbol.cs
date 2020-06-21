using System;

namespace FilmLibraryTest.Helper
{
    /// <summary>
    /// Класс автогенерации символов.
    /// </summary>
    public static class AutoGenerateSymbol
    {
        /// <summary>
        /// Получить автосгенерированные символы.
        /// </summary>
        /// <param name="length">Количество символов.</param>
        /// <returns>Строка.</returns>
        public static string GetSymbols(int length)
        {
            return AutoGenerate(length);
        }

        private static string AutoGenerate(int length)
        {
            var rnd = new Random();
            string result = null;
            var pwdChars = new[]
            {
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                '@', '#', '$', '&', '(', ')', '=', '+', '/', '-', '!', '<', '>', '.', ','
            };

            for (var i = 0; i < length; i++)
                result += pwdChars[rnd.Next(0, 77)];
            return result;
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using FilmLibraryTest.Models;

namespace FilmLibraryTest.ViewModels.Response
{
    public class FilmResponseViewModel : IResultModel<Film>
    {
        public string Error { get; set; }
        public Film Result { get; set; }
    }
}
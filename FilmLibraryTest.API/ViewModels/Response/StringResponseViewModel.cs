using System.Collections.Generic;
using FilmLibraryTest.Models;

namespace FilmLibraryTest.ViewModels.Response
{
    public class StringResponseViewModel:IResultModel<string>
    {
        public string Error { get; set; }
        public string Result { get; set; }
    }
}
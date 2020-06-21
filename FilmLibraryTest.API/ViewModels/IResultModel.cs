using System.Collections.Generic;
using System.Threading.Tasks;
using FilmLibraryTest.Models;

namespace FilmLibraryTest.ViewModels
{
    public interface IResultModel<T>
    {
        public string Error { get; set; }
        public T Result { get; set; }
    }
}
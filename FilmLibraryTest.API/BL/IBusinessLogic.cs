using System.Threading.Tasks;

namespace FilmLibraryTest.BL
{
    public interface IBusinessLogic<in TIn, TOut>
    {
        Task<TOut> GetResult(TIn input);
    }
}
namespace FilmLibraryTest.ViewModels.Response
{
    public class UserResponseViewModel : IResultModel<UserLoginViewModel>
    {
        public string Error { get; set; }
        public UserLoginViewModel Result { get; set; }
    }
}
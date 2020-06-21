import {FilmClient, IResultModelOfListFilm} from "../../../../apiClient/apiClient";
import {baseUrl} from "../../../../apiClient/baseUrl";


export async function GetMyFilmsAction(skip: number, take: number): Promise<IResultModelOfListFilm> {
    let result: IResultModelOfListFilm = {
        error: undefined,
        result: {
            films: [],
            totalCount: 0
        }
    };

    try {
        let client = new FilmClient(baseUrl);
        return await client.getMyFilms(skip, take, localStorage.getItem("apiToken"));

    } catch (error) {
        result.error = error;
        return result;
    }
}
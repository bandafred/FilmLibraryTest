import {FilmClient, IResultModelOfListFilm} from "../../../../apiClient/apiClient";
import {baseUrl} from "../../../../apiClient/baseUrl";


export async function GetFilmsAction(skip: number, take: number): Promise<IResultModelOfListFilm> {
    let result: IResultModelOfListFilm = {
        error: undefined,
        result: {
            films: [],
            totalCount: 0
        }
    };

    try {
        let client = new FilmClient(baseUrl);
        return await client.getAllFilms(skip, take);

    } catch (error) {
        result.error = error;
        return result;
    }
}
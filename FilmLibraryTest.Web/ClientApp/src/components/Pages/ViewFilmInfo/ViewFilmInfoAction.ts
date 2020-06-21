import {FilmClient, IResultModelOfFilm} from "../../../apiClient/apiClient";
import {baseUrl} from "../../../apiClient/baseUrl";

export async function ViewFilmInfoAction(id: number) {
    let res: IResultModelOfFilm = {
        error: undefined,
        result: undefined
    }

    try {
        let client = new FilmClient(baseUrl);
        return await client.getFilmToId(id);
        
    } catch (error) {
        res.error = error;
        return res;
    }
}
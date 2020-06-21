import {FileParameter, FilmClient} from "../../../apiClient/apiClient";
import {baseUrl} from "../../../apiClient/baseUrl";

export async function EditFilmAction(file: any | null | undefined, id: number | undefined, title: string | null | undefined, description: string | null | undefined, year: number | undefined, producer: string | null | undefined, token: string | null | undefined) {

    try {
        let client = new FilmClient(baseUrl);

        let filleAdd: FileParameter | undefined = {
            fileName: file.name,
            data: file.originFileObj ?? file
        }


        if (!filleAdd.data) filleAdd = undefined;

        return await client.addFilm(filleAdd, id, title, description, year, producer, token);

    } catch (error) {
    }
}
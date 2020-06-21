import {FilmClient} from "../../../../apiClient/apiClient";
import {baseUrl} from "../../../../apiClient/baseUrl";

export async function GetPhotoAction(id: number | undefined) {
    try {
        let client = new FilmClient(baseUrl);
        return await client.getPhoto(id);

    } catch (error) {
    }
}
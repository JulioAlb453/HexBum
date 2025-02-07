import { Observable } from "rxjs";
import { Album } from "../domain/album.model";


export interface AlbumRepository {

    getAlbums(): Observable<Album[]>
    getAlbumsById(id: string): Observable <Album | null>
    createAlbum(album: Album): Observable<Album>
    deleteAlbum(id: string): Observable<void>

}

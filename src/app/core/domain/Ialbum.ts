import { Observable } from "rxjs";
import { Album } from "./album.model";
import { InjectionToken } from "@angular/core";

export const ALBUM_REPOSITORY = new InjectionToken<AlbumRepository>('AlbumRepository');

export interface AlbumRepository {
    

    getAlbums(): Observable<Album[]>
    searchAlbum(searchTerm: string, searchType: 'title' | 'artist'): Observable<Album[]>
    createAlbum(album: Album): Observable<Album>
    deleteAlbum(id: string): Observable<void>
    updateAlbum(id: string, album: Album): Observable<Album>;


}

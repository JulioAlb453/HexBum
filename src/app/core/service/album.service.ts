import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../domain/album.model';
import { AlbumsUseCase } from '../application/album.use-case';
@Injectable({ providedIn: 'root' })
export class AlbumService {
    constructor(private albumsUseCase: AlbumsUseCase) {} 

    getAlbums(): Observable<Album[]> {
        return this.albumsUseCase.getAlbums();
    }

    createAlbum(album: Album): Observable<Album> {
        return this.albumsUseCase.createAlbum(album);
    }

    updateAlbum(id: string, album: Album): Observable<Album> {
        return this.albumsUseCase.updateAlbum(id, album);
    }

    deleteAlbum(id: string): Observable<void> {
        return this.albumsUseCase.deleteAlbum(id);
    }

    searchAlbums(searchTerm: string, searchType: 'title' | 'artist'): Observable<Album[]> {
        return this.albumsUseCase.searchAlbums(searchTerm, searchType);
    }
}
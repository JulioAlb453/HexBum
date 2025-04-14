import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AlbumRepository } from '../../domain/Ialbum';
import { Album } from '../../domain/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumHttpRepository implements AlbumRepository {
    private baseUrl = 'http://localhost:8080/albums/';

    constructor(private http: HttpClient) {}

    getAlbums(): Observable<Album[]> {
        return this.http.get<Album[]>(this.baseUrl);
    }

    getAlbumById(id: string, album: Album): Observable<Album> {
        return this.http.get<Album>(`${this.baseUrl}/${id}`);
      }

    createAlbum(album: Album): Observable<Album> {
        return this.http.post<Album>(this.baseUrl, album);
    }

    deleteAlbum(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}${id}`);
    }

    updateAlbum(id: string, album: Album): Observable<Album> {
        return this.http.put<Album>(`/api/albums/${id}`, album);
      }
      

    searchAlbum(searchTerm: string, searchType: 'title' | 'artist'): Observable<Album[]> {
        const url = `${this.baseUrl}search/${searchType}/${encodeURIComponent(searchTerm)}`;
        return this.http.get<Album[]>(url);
    }
}
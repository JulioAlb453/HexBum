import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../domain/album.model';
import { AlbumRepository } from '../domain/Ialbum';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService implements AlbumRepository {
  private baseUrl = 'http://localhost:8080/albums/';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.baseUrl);
  }

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.baseUrl, album);
  }

  getAlbumsById(id: string): Observable<Album | null> {
    return this.http.get<Album | null>(`${this.baseUrl}${id}`);
  }

  deleteAlbum(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

  updateAlbum(itemId: string, album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.baseUrl}${itemId}`, album);
  } 

  getAlbumByArtistOrTitle(searchTerm: string, searchType: 'title' | 'artist'): Observable<Album> {
    const cleanedSearchTerm = searchTerm.trim();
  
    if (!cleanedSearchTerm) {
      return throwError(() => new Error('El término de búsqueda no puede estar vacío.'));
    }
  
    const searchUrl = searchType === 'artist'
      ? `${this.baseUrl}search/artist/${encodeURIComponent(cleanedSearchTerm)}`
      : `${this.baseUrl}search/title/${encodeURIComponent(cleanedSearchTerm)}`;
  
    return this.http.get<Album>(searchUrl);
  }
  
}

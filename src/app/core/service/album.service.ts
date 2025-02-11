import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../domain/album.model';
import { AlbumRepository } from '../application/album-repository';
import { Observable } from 'rxjs';

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
    console.log('Id del album: ' + id)
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../application/domain/album.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumServiceService {
  private baseUrl = 'http//:localhost:8080/albums';

  constructor(private http: HttpClient) {}

  createAlbum(albumData: Album): Observable<Album> {
    return this.http
      .post<Album>(this.baseUrl, albumData)
      .pipe(catchError(this.handlerError));
  }

  getAlbums(): Observable<Album[]> {
    return this.http
      .get<Album[]>(this.baseUrl)
      .pipe(catchError(this.handlerError));
  }

  private handlerError(error: any): Observable<never> {
    console.error('Error en la API: ', error);
    return throwError(
      () => new Error('Ocurrio un error al comunicarse con el servidor: ')
    );
  }
}

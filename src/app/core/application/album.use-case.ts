import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Album } from '../domain/album.model';
import { AlbumRepository, ALBUM_REPOSITORY } from '../domain/Ialbum';

@Injectable({ providedIn: 'root' })
export class AlbumsUseCase {
  constructor(@Inject(ALBUM_REPOSITORY) private repository: AlbumRepository) {}

  getAlbums(): Observable<Album[]> {
    return this.repository.getAlbums();
  }

  createAlbum(album: Album): Observable<Album> {
    if (!album || !album.Title || !album.Artist) {
      return throwError(() => new Error('El álbum debe tener un título y un artista.'));
    }
    return this.repository.createAlbum(album);
  }
  updateAlbum(id: string, album: Album): Observable<Album> {
    if (!id || !album) {
      return throwError(() => new Error('Se debe proporcionar un ID y los datos del álbum.'));
    }

    if (!album.Title || !album.Artist) {
      return throwError(() => new Error('El álbum debe tener un título y un artista.'));
    }

    return this.repository.updateAlbum(id, album);
  }

  deleteAlbum(id: string): Observable<void> {
    if (!id) {
      return throwError(() => new Error('Se debe proporcionar un ID para eliminar el álbum.'));
    }
    return this.repository.deleteAlbum(id);
  }

  searchAlbums(searchTerm: string, searchType: 'title' | 'artist'): Observable<Album[]> {
    const cleanedSearchTerm = searchTerm.trim();

    if (!cleanedSearchTerm) {
      return throwError(() => new Error('El término de búsqueda no puede estar vacío.'));
    }

    if (searchType !== 'title' && searchType !== 'artist') {
      return throwError(() => new Error('El tipo de búsqueda debe ser "title" o "artist".'));
    }

    return this.repository.searchAlbum(cleanedSearchTerm, searchType);
  }
}

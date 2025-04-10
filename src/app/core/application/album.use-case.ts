import { Observable } from 'rxjs';
import { Album } from '../domain/album.model';
import { AlbumRepository } from '../domain/Ialbum';

export class AlbumsUseCase {
  constructor(private albumRepository: AlbumRepository) {}

  getAlbums(): Observable<Album[]> {
    return this.albumRepository.getAlbums();
  }

  createAlbum(album: Album): Observable<Album> {
    return this.albumRepository.createAlbum(album);
  }

  getAlbumById(id: string): Observable<Album | null> {
    return this.albumRepository.getAlbumsById(id);
  }

  deleteAlbum(id: string):Observable<void>{
    return this.albumRepository.deleteAlbum(id)
  }
}

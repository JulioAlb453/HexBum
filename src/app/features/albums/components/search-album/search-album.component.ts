import { Component } from '@angular/core';
import { AlbumService } from '../../../../core/service/album.service';
import { Album } from '../../../../core/domain/album.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-album',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-album.component.html',
  styleUrl: './search-album.component.css',
})
export class SearchAlbumComponent {
  searchTerm: string = '';
  searchType: 'title' | 'artist' = 'title';
  data: Album | null = null;

  constructor(private albumService: AlbumService) {}

  searchAlbum(event: Event): void {
    event.preventDefault();

    if (!this.searchTerm.trim()) {
      return;
    }
    this.albumService
      .getAlbumByArtistOrTitle(this.searchTerm, this.searchType)
      .subscribe({
        next: (data) => {
          if (Array.isArray(data) && data.length > 0) {
            this.data = data[0]; // Asumimos que queremos el primer álbum de la lista
          } else {
            console.log('No se encontraron resultados');
            this.data = null;
          }
        },
        error: (err) => {
          console.error('Error al buscar el álbum:', err);
          this.data = null;
        },
      });
  }
}

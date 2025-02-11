import { Component } from '@angular/core';
import { AlbumService } from '../../../../core/service/album.service';
import { Album } from '../../../../core/domain/album.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-album',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-album.component.html',
  styleUrl: './search-album.component.css',
})
export class SearchAlbumComponent {
  searchId: string = '';
  data: Album | null = null;
  constructor(private albumService: AlbumService) {}

  searchAlbumbyId(event: Event): void {
    event.preventDefault();

    if (!this.searchId) {
      return;
    }

    this.albumService.getAlbumsById(this.searchId).subscribe({
      next: (data) => (this.data = data),
      error: (err) => {
        console.error('Error al buscar el album:', err);
        this.data = null;
      },
    });
  }
}

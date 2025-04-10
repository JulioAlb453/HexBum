import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlbumService } from '../../../core/service/album.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-button',
  imports: [MatIconModule],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css'
})
export class DeleteButtonComponent {
  @Input() itemId: string = "";
  @Output() delete = new EventEmitter<void>()

  constructor(private albumService: AlbumService) {}

  onDelete(itemId: string): void {
    console.log('Eliminando album:', itemId);
    this.albumService.deleteAlbum(itemId).subscribe({
      next: () => {
        alert('Álbum eliminado correctamente');
        this.delete.emit();  
      },
      error: (err) => {
        console.error('Error al eliminar el album', err)
        alert('Ocurrió un error al eliminar el álbum. Inténtalo de nuevo.');;
      },
    });
  }
}

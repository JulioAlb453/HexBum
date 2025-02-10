import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlbumService } from '../../../core/service/album.service';

@Component({
  selector: 'app-delete-button',
  imports: [],
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
        console.log('Album eliminado');
        this.delete.emit();  
      },
      error: (err) => {
        console.error('Error al eliminar el album', err);
      },
    });
  }
}

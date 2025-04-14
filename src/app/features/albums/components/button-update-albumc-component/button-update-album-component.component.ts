import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlbumService } from '../../../../core/service/album.service';
import { UpdateAlbumDialogComponent } from '../update-album-dialog-component/update-album-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-button-update-album-component',
  imports: [MatIconModule],
  templateUrl: './button-update-album-component.component.html',
  styleUrl: './button-update-album-component.component.css',
})
export class ButtonUpdateAlbumComponentComponent {
  @Input() itemId: string = '';
  @Output() update = new EventEmitter<void>();

  constructor(private albumService: AlbumService, private dialog: MatDialog) {}

  openUpdateModal(): void {
    const dialogRef = this.dialog.open(UpdateAlbumDialogComponent, {
      width: '400px',
      data: { itemId: this.itemId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.update.emit();
      }
    });
  }
}
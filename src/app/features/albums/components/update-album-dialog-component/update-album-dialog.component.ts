import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumService } from '../../../../core/service/album.service';
import { Album } from '../../../../core/domain/album.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-album-dialog-component',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './update-album-dialog.component.html',
  styleUrls: ['./update-album-dialog.component.css'],
})
export class UpdateAlbumDialogComponent {
  updateData: Album = {
    Title: '',
    Artist: '',
    Stock: 0,
    Price: 0,
    Year: '',
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<UpdateAlbumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemId: string },
    private albumService: AlbumService
  ) {}

  updateAlbum(): void {
    this.errorMessage = '';
    this.successMessage = '';
  
    if (!this.data.itemId || !this.updateData.Title || !this.updateData.Artist) {
      this.errorMessage = 'El ID, el título y el artista del álbum son obligatorios.';
      console.warn('Error en la entrada de datos: ID, título o artista faltante.');
      return;
    }
  
    if (isNaN(this.updateData.Stock) || isNaN(this.updateData.Price)) {
      this.errorMessage = 'El stock y el precio deben ser números válidos.';
      console.warn('Error en los datos: Stock o precio no válidos.');
      return;
    }
  
    console.log('Enviando solicitud de actualización para el álbum con ID:', this.data.itemId);
    console.log('Datos enviados para actualización:', this.updateData);
  
    this.albumService.updateAlbum(this.data.itemId, this.updateData).subscribe({
      next: (response) => {
        console.log("data: " + this.updateData)
        console.log('Respuesta del servidor:', response);
        this.successMessage = 'Álbum actualizado correctamente';
        setTimeout(() => {
          this.dialogRef.close(true);
          window.location.reload();
        }, 1000);
      },
      error: () => {
        this.errorMessage = 'Ocurrió un error al actualizar el álbum. Inténtalo de nuevo.';
      }
    });
  }
  
}

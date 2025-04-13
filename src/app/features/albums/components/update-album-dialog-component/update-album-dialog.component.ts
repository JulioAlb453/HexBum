import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumService } from '../../../../core/service/album.service';
import { Album } from '../../../../core/domain/album.model';
import { WebsocketService } from '../../../../core/service/websocket.service'; // Asegúrate de importar el servicio de WebSocket
import { AlertService } from '../../../../core/service/alert-service.service'; // Asegúrate de importar el servicio de Alertas
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
export class UpdateAlbumDialogComponent implements OnInit {
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
    private albumService: AlbumService,
    private websocketService: WebsocketService, // Inyecta el servicio de WebSocket
    private alertService: AlertService // Inyecta el servicio de Alertas
  ) {}

  ngOnInit() {
    // Suscripción para escuchar los mensajes del WebSocket
    this.websocketService.onAlbumUpdates().subscribe(
      (msg) => {
        console.log('[WebSocket] Mensaje recibido:', msg);
        // Mostrar alerta o manejar los mensajes de WebSocket
        if (msg.event_type === 'low_stock_alert') {
          this.showLowStockAlert(msg);
        }
      },
      (err) => {
        console.error('[WebSocket] Error al recibir el mensaje:', err);
      }
    );
  }

  // Método para mostrar la alerta cuando hay stock bajo
  showLowStockAlert(msg: any): void {
    this.alertService.showLowStockAlert();
  }

  updateAlbum(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.data.itemId ||
      !this.updateData.Title ||
      !this.updateData.Artist
    ) {
      this.errorMessage =
        'El ID, el título y el artista del álbum son obligatorios.';
      console.warn(
        'Error en la entrada de datos: ID, título o artista faltante.'
      );
      return;
    }

    if (isNaN(this.updateData.Stock) || isNaN(this.updateData.Price)) {
      this.errorMessage = 'El stock y el precio deben ser números válidos.';
      console.warn('Error en los datos: Stock o precio no válidos.');
      return;
    }

    console.log(
      'Enviando solicitud de actualización para el álbum con ID:',
      this.data.itemId
    );
    console.log('Datos enviados para actualización:', this.updateData);

    this.albumService
      .updateAlbum(this.data.itemId, {
        ...this.updateData,
        _id: this.data.itemId,
      })
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.successMessage = 'Álbum actualizado correctamente.';
          
          // Mostrar la notificación de éxito
          this.alertService.showSuccess('Álbum actualizado correctamente.');

          // Cuando se cierre la notificación de éxito, verificar stock y emitir la alerta si es necesario
          setTimeout(() => {
            if (this.updateData.Stock < 5) { // Si el stock es bajo
              this.showLowStockAlert(response);
            }
            this.dialogRef.close(true);
          }, 3000); // El tiempo de espera se puede ajustar (en milisegundos)
        },
        error: (error) => {
          console.error('Error al actualizar el álbum:', error);
          this.errorMessage = error.message || 'Error al actualizar el álbum.';
          this.alertService.showError(this.errorMessage);
        },
      });
  }
}

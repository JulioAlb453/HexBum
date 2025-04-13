import { Component, OnInit, OnDestroy } from '@angular/core';
import { Album } from '../../../../core/domain/album.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlbumService } from '../../../../core/service/album.service';
import { DeleteButtonComponent } from '../../../../shared/components/delete-button/delete-button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonUpdateAlbumComponentComponent } from '../button-update-albumc-component/button-update-album-component.component';
import { WebsocketService } from '../../../../core/service/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    HttpClientModule,
    DeleteButtonComponent,
    ButtonUpdateAlbumComponentComponent,
  ],
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit, OnDestroy {
  dataSource: Album[] = [];
  private wsSubscription!: Subscription;

  displayedColumns: string[] = [
    'title',
    'artist',
    'releaseDate',
    'stock',
    'price',
    'actions',
    'folio',
  ];

  constructor(
    private albumService: AlbumService,
    private snackBar: MatSnackBar,
    private wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.fetchAlbums();
    this.initWebSocket();
  }

  ngOnDestroy(): void {
    this.wsSubscription?.unsubscribe();
  }

  fetchAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.dataSource = data || [];
      },
      error: (err) => {
        console.error('Error al cargar los álbumes:', err);
        this.showError('Error al cargar los álbumes');
      },
    });
  }

  initWebSocket(): void {
    this.wsSubscription = this.wsService.onAlbumUpdates().subscribe({
      next: (update) => {
        console.log('📥 WebSocket recibido:', update);
        this.handleAlbumUpdate(update);
      },
      error: (err) => {
        console.error('Error en WebSocket:', err);
        this.showError('Conexión con WebSocket fallida');
      }
    });
  }

  handleAlbumUpdate(update: any): void {
    const index = this.dataSource.findIndex(a => a._id === update._id);

    if (index !== -1) {
      this.dataSource[index] = {
        ...this.dataSource[index],
        ...update
      };

      this.dataSource = [...this.dataSource]; // 🔄 Forzar detección de cambios
      this.showSuccess(`Álbum "${update.Title}" actualizado en tiempo real`);
    } else {
      console.warn('Álbum no encontrado en la lista. Recargando lista completa...');
      this.fetchAlbums(); // En caso de que sea un nuevo álbum o eliminación
    }
  }

  handlerAlbumsDelete(): void {
    this.fetchAlbums();
    this.showSuccess('Álbum eliminado correctamente');
  }

  handlerAlbumsUpdate(): void {
    this.fetchAlbums();
    this.showSuccess('Álbum actualizado correctamente');
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snack-bar-success'],
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snack-bar-error'],
    });
  }

  showInfo(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snack-bar-info'],
    });
  }
}

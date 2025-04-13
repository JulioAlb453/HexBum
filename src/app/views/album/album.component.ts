import { Component } from '@angular/core';
import { AlbumListComponent } from '../../features/albums/components/album-list/album-list.component';
import { RouterModule } from '@angular/router';
import { AlbumFormComponent } from '../../features/albums/components/album-form/album-form.component';
import { SearchAlbumComponent } from '../../features/albums/components/search-album/search-album.component';
import { HttpClientModule } from '@angular/common/http';
import { WebsocketService } from '../../core/service/websocket.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    AlbumListComponent,
    AlbumFormComponent,
    SearchAlbumComponent,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  private socket!: WebSocket;

  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {}

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messageSubject.next(message); // Emite los mensajes recibidos
    };

    this.socket.onopen = () => {
      console.log('Conexión WebSocket abierta');
    };

    this.socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    this.socket.onerror = (error) => {
      console.error('Error en WebSocket', error);
    };
  }

  get messages$() {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: any): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

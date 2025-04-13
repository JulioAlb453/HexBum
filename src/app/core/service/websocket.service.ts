import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; // Importa la librería para generar UUID



@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private messages: any[] = [];
  private messagesSubject = new Subject<any>();

  constructor() {
    this.loadMessages(); // Cargar los mensajes almacenados al inicio
    this.connect();
  }

  private reconnect(): void {
    console.log('Reconectando WebSocket...');
    setTimeout(() => this.connect(), 3000); // Intentar reconectar cada 3 segundos
  }
  // Cargar los mensajes desde el localStorage si existen
  private loadMessages() {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      this.messages = JSON.parse(storedMessages);
    }
  }

  // Guardar los mensajes en el localStorage para preservarlos
  private saveMessages() {
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  // Generar un token único y guardarlo en localStorage
  private generateToken(): string {
    const token = uuidv4(); // Genera un UUID único
    localStorage.setItem('token', token); // Guarda el token en el localStorage
    return token;
  }

  // Obtener el token desde localStorage
  private getToken(): string {
    let token = localStorage.getItem('token');
    if (!token) {
      // Si no existe el token, generamos uno nuevo y lo guardamos
      token = this.generateToken();
    }
    return token;
  }

  // Conectar al WebSocket utilizando el token
  connect(): void {
    const token = this.getToken();
    const socketUrl = `ws://localhost:8081/ws?userID=${token}`;
  
    if (this.socket) {
      console.log('Ya hay una conexión WebSocket activa.');
      return;
    }
  
    this.socket = new WebSocket(socketUrl);
  
    this.socket.onopen = () => {
      console.log('Conexión WebSocket abierta.');
      this.replayMessages();
    };
  
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Mensaje recibido:', message);
      this.messages.push(message);
      this.messagesSubject.next(message);
      this.saveMessages();
    };
  
    this.socket.onclose = () => {
      console.log('Conexión WebSocket cerrada.');
      this.socket = null;
      this.reconnect(); // Intentar reconectar si se cierra la conexión
    };
  
    this.socket.onerror = (error) => {
      console.error('Error WebSocket:', error);
      this.socket?.close(); // Cerrar la conexión de manera segura
    };
  }
  // Obtener los mensajes actuales
  getMessages() {
    return this.messagesSubject.asObservable();
  }

  // Reenviar los mensajes almacenados que aún no se han mostrado
  private replayMessages(): void {
    for (const message of this.messages) {
      this.messagesSubject.next(message);
    }
  }

  // Enviar un mensaje al WebSocket
  sendMessage(message: any): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket no está abierto. No se puede enviar el mensaje.');
    }
  }

  // Cerrar la conexión WebSocket manualmente
  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
      console.log('Conexión WebSocket cerrada manualmente.');
    }
  }
}

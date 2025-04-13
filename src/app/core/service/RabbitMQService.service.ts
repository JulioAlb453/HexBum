import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RabbitMQService {
  private eventSubject = new Subject<any>();  // Subject para emitir eventos
  public eventObservable = this.eventSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  onMessageReceived(message: any): void {
    console.log('Mensaje recibido:', message);

    this.eventSubject.next(message);

    if (message.data.warning_level === 'Baja cantidad') {
      this.snackBar.open('¡Atención! El stock está bajo', 'Cerrar', {
        duration: 3000,
        panelClass: ['snack-bar-warning'],
      });
    }
  }
}

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, retryWhen, delay, scan } from 'rxjs/operators';
import { Observable, EMPTY, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;
  private readonly WS_ENDPOINT = 'ws://localhost:8081/ws'; 

  constructor() {
    this.connect();
  }

  private connect(): void {
    if (!this.socket$ || this.socket$.closed) {
        this.socket$ = webSocket({
            url: this.WS_ENDPOINT,
            openObserver: {
                next: () => console.log('[WebSocket] Conexión establecida')
            },
            closeObserver: {
                next: () => {
                    console.log('[WebSocket] Conexión cerrada, reconectando...');
                    setTimeout(() => this.connect(), 5000);
                }
            }
        });

        this.socket$.subscribe({
            next: (msg) => console.log('[WebSocket] Mensaje recibido:', msg),
            error: (err) => {
                console.error('[WebSocket] Error:', err);
                this.connect();
            },
            complete: () => console.log('[WebSocket] Conexión cerrada desde el cliente')
        });
    }
  }

  public onAlbumUpdates(): Observable<any> {
    return this.socket$.pipe(
      tap({
        next: (msg) => console.log('[WebSocket] Mensaje recibido:', msg),
        error: (err) => console.error('[WebSocket] Error:', err)
      }),
      retryWhen(errors => 
        errors.pipe(
          scan((retryCount, error) => {
            if (retryCount >= 5) {
              throw error;  
            }
            console.log('Reintentando conexión WebSocket...');
            return retryCount + 1; 
          }, 0),
          delay(5000)
        )
      ),
      catchError(error => {
        console.error('Error en WebSocket:', error);
        return EMPTY;
      })
    );
  }

  public close(): void {
    this.socket$?.complete();
    console.log('[WebSocket] Conexión cerrada intencionalmente');
  }
}

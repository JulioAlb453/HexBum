// alert-service.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 8000, 
      panelClass: ['snack-bar-success'],
      verticalPosition: 'top', // Mostrar en la parte superior
      horizontalPosition: 'right', // Mostrar en la parte derecha
    });
  }

  // Mostrar alerta de error
  showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 8000,
      panelClass: ['snack-bar-error'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  // Mostrar alerta de información
  showInfo(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 8000,
      panelClass: ['snack-bar-info'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  // Alerta de stock bajo
  showLowStockAlert(): void {
    this.snackBar.open('¡Atención! El stock del álbum está bajo.', 'Cerrar', {
      duration: 8000,
      panelClass: ['snack-bar-warning'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  // Alerta de sin stock
  showOutOfStockAlert(): void {
    this.snackBar.open('¡Atención! El álbum está fuera de stock.', 'Cerrar', {
      duration: 8000,
      panelClass: ['snack-bar-danger'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}

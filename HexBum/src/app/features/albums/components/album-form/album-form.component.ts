import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlbumService } from '../../../../core/service/album.service';
import { Album } from '../../../../core/domain/album.model';

@Component({
  selector: 'app-album-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './album-form.component.html',
  styleUrl: './album-form.component.css',
})
export class AlbumFormComponent implements OnChanges {
  @Input() albumData?: Album;
  albumForm: FormGroup;

  constructor(private fb: FormBuilder, private albumApi: AlbumService) {
    this.albumForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      year: ['', Validators.required],
      stock: [0, Validators.required],
      price: [0, Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['albumData'] && this.albumData) {
      this.albumForm.patchValue({
        title: this.albumData.Title,
        artist: this.albumData.Artist,
        year: this.albumData.Year,
        stock: this.albumData.Stock,
        price: this.albumData.Price,
      });
    }
  }

  saveAlbum(): void {
    try {
      if (this.albumForm.invalid) {
        console.error('Formulario inválido:', this.albumForm.value);
        alert('Por favor, completa todos los campos requeridos antes de enviar.');
        return;
      }
  
      const album: Album = this.albumForm.value;
  
      this.albumApi.createAlbum(album).subscribe({
        next: (response) => {
          console.log('Álbum creado exitosamente:', response);
          alert('Álbum creado exitosamente');
          this.albumForm.reset(); 
        },
        error: (err) => {
          console.error('Error al crear el álbum:', err);
  
          if (err.status === 400) {
            alert('Solicitud inválida: Verifica los datos enviados.');
          } else if (err.status === 500) {
            alert('Error del servidor: Inténtalo más tarde.');
          } else {
            alert('Ocurrió un error inesperado: ' + err.message);
          }
        },
      });
    } catch (e) {
      console.error('Error inesperado:', e);
      alert('Ocurrió un error inesperado. Por favor, inténtalo más tarde.');
    }
  }
  
}

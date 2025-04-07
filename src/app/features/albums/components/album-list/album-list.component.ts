import { Component, OnInit } from '@angular/core';
import { Album } from '../../../../core/domain/album.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlbumService } from '../../../../core/service/album.service';
import { DeleteButtonComponent } from '../../../../shared/components/delete-button/delete-button.component';
import { ButtonUpdateAlbumComponentComponent } from '../button-update-albumc-component/button-update-album-component.component';
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
export class AlbumListComponent implements OnInit {
  dataSource: Album[] = [];

  displayedColumns: string[] = [
    'title',
    'artist',
    'releaseDate',
    'stock',
    'price',
    'actions',
    'folio'
  ];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.fetchAlbums();
  }

  fetchAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.dataSource = data || [];
        console.log(data)
      },
      error: (err) => {
        console.error('Error al cargar los albums:', err);
      },
    });
  }
 
  handlerAlbumsDelete():void{
    this.fetchAlbums()
  }

  handlerAlbumsUpdate(): void{
    this.fetchAlbums()
  }
}

import { Component, OnInit } from '@angular/core';
import { Album } from '../../../../core/domain/album.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlbumService } from '../../../../core/service/album.service';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, HttpClientModule],
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit {
  dataSource: Album[] = [];
  displayedColumns: string[] = ['title', 'artist', 'releaseDate', 'stock', 'price'];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.fetchAlbums();
  }

  fetchAlbums(): void {
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.dataSource = data || [];
      },
      error: (err) => {
        console.error('Error fetching albums:', err);
      },
    });
  }
}

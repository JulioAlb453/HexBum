import { Component } from '@angular/core';
import { AlbumListComponent } from '../../features/albums/components/album-list/album-list.component';
import { RouterModule } from '@angular/router';
import { AlbumFormComponent } from '../../features/albums/components/album-form/album-form.component';
import { SearchAlbumComponent } from '../../features/albums/components/search-album/search-album.component';
import { HttpClientModule } from '@angular/common/http';
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
export class AlbumComponent {}

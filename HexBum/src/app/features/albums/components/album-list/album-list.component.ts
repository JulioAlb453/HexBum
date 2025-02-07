import { Component, Input } from '@angular/core';
import { Album } from '../../../../core/domain/album.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-album-list',
  imports: [MatTableModule, CommonModule],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})
export class AlbumListComponent {

  @Input() albums: Album[] = []

}

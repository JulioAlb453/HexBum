import { Routes } from '@angular/router';
import { AlbumComponent } from './views/album/album.component';
// import { AlbumListComponent } from './features/albums/components/album-list/album-list.component';

export const routes: Routes = [
  {
    path: 'albums',
    component: AlbumComponent,
  },
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
];

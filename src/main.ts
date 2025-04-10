import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ALBUM_REPOSITORY } from './app/core/domain/Ialbum';
import { AlbumHttpRepository } from './app/core/service/repositories/album-http.repository';
import { AlbumsUseCase } from './app/core/application/album.use-case';
import { AlbumService } from './app/core/service/album.service';
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    
    // Provee tus servicios personalizados
    { provide: ALBUM_REPOSITORY, useClass: AlbumHttpRepository },
    AlbumsUseCase,
    AlbumService
  ],
}).catch((err) => console.error(err));
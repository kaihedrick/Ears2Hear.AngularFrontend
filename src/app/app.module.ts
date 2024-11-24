import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP_INTERCEPTORS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { DeleteAlbumComponent } from './delete-album/delete-album.component';
import { DisplayAlbumComponent } from './display-album/display-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { ListAlbumsComponent } from './list-albums/list-albums.component';
import { ListArtistsComponent } from './list-artists/list-artists.component';
import { ListTracksComponent } from './list-tracks/list-tracks.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LikedTracksComponent } from './liked-tracks/liked-tracks.component'; // Import AuthInterceptor

@NgModule({
  declarations: [
    AppComponent,
    CreateAlbumComponent,
    DeleteAlbumComponent,
    DisplayAlbumComponent,
    EditAlbumComponent,
    ListAlbumsComponent,
    ListArtistsComponent,
    ListTracksComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    LikedTracksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch()), // Required for HTTP client features
    {
      provide: HTTP_INTERCEPTORS, // Register the AuthInterceptor
      useClass: AuthInterceptor,
      multi: true, // Ensure multiple interceptors can be used
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

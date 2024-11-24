import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListTracksComponent } from './list-tracks/list-tracks.component';
import { HomeComponent } from './home/home.component';
import { LikedTracksComponent } from './liked-tracks/liked-tracks.component';
const routes: Routes = [//here are all the routes created so far
  { path: 'users', component: LoginComponent },
  { path: 'tracks', component: ListTracksComponent },
  { path: 'liked-tracks', component: LikedTracksComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

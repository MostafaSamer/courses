import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './comps/place/profile/about/about.component'
import { CoursesComponent } from './comps/place/profile/courses/courses.component'
import { FavComponent } from './comps/user/fav/fav.component'
import { HomeComponent } from './comps/user/home/home.component'
import { LoginComponent } from './comps/user/login/login.component'
import { MuneComponent } from './comps/user/mune/mune.component'
import { RegisterComponent } from './comps/user/register/register.component'
import { SearchComponent } from './comps/user/search/search.component'

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CoursesComponent,
    FavComponent,
    HomeComponent,
    LoginComponent,
    MuneComponent,
    RegisterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

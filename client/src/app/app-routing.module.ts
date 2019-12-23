import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './comps/place/profile/about/about.component'
import { CoursesComponent } from './comps/place/profile/courses/courses.component'
import { FavComponent } from './comps/user/fav/fav.component'
import { HomeComponent } from './comps/user/home/home.component'
import { LoginComponent } from './comps/user/login/login.component'
import { MuneComponent } from './comps/user/mune/mune.component'
import { RegisterComponent } from './comps/user/register/register.component'
import { SearchComponent } from './comps/user/search/search.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: '/user/home',
        pathMatch: 'full'
    },
    {
        path: 'place/profile/about',
        component: AboutComponent
    },
    {
        path: 'place/profile/courses',
        component: CoursesComponent
    },
    {
        path: 'user/fav',
        component: FavComponent
    },
    {
        path: 'user/home',
        component: HomeComponent
    },
    {
        path: 'user/login',
        component: LoginComponent
    },
    {
        path: 'user/mune',
        component: MuneComponent
    },
    {
        path: 'user/register',
        component: RegisterComponent
    },
    {
        path: 'user/search',
        component: SearchComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

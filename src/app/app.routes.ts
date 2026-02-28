import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { HomePage } from './home/home';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about', component: AboutComponent },
];

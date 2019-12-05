import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Every time add a "component", need to add "import" at here first
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// After adding "import", add "routes" here
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './newevent.component';

const routes: Routes = [
 { path: 'newevent', component: NewEventComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

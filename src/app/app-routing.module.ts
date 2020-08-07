import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { } from './chat/chat.component';

const routes: Routes = [
 // { path: 'char', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

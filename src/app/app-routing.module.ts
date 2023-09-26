import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { AppComponent } from './app.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';

const routes: Routes = [
  {
    path: 'client/:id',
    data: { reloadOnSearch: true },
    component: ClientDetailComponent,
  },
  { path: 'add-client', component: ClientFormComponent },
  {
    path: 'list',
    component: ClientsListComponent,
    data: { reloadOnSearch: true },
  },
  { path: 'update-client/:id', component: ClientFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

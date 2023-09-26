import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientCardComponent } from './components/client-card/client-card.component';

@NgModule({
  declarations: [AppComponent, ClientFormComponent, ClientsListComponent, ClientDetailComponent, ClientCardComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

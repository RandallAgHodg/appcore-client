import { Component, Input } from '@angular/core';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css'],
})
export class ClientCardComponent {
  @Input()
  client!: Client;

  constructor() {
    console.log(this.client);
  }
}

import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../client.service';
import { Client } from 'src/app/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];

  constructor(
    private readonly _clientService: ClientService,
    private readonly _router: Router
  ) {}
  ngOnInit(): void {
    this._clientService.getAllClients().subscribe(({ response }: any) => {
      this.clients = response as Client[];
    });
  }

  redirectToDetailPage(id: number) {
    this._router.navigateByUrl(`/client/${id}`);
  }
}

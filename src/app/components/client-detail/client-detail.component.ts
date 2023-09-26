import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent implements OnInit {
  client!: Client;
  isLoading: boolean = false;

  constructor(
    private readonly _router: Router,
    private readonly _clientService: ClientService,
    private readonly _activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this._clientService.getClientById(id);
        })
      )
      .subscribe((resp: any) => {
        this.client = resp.response as Client;
        this.isLoading = false;
      });
  }

  delete(): void {
    this._clientService
      .deleteClient(this.client.idCliente!)
      .subscribe(() => this._router.navigateByUrl('/list'));
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  client!: Client;
  showToast: boolean = false;
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _clientService: ClientService
  ) {}
  ngOnInit(): void {
    this.clientForm = this.initForm();
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this._clientService.getClientById(id);
        })
      )
      .subscribe((resp: any) => {
        this.client = resp.response as Client;
        this.clientForm
          .get('nombreCliente')
          ?.setValue(this.client.nombreCliente);
        this.clientForm
          .get('apellidoCliente')
          ?.setValue(this.client.apellidoCliente);
        this.clientForm.get('categoria')?.setValue(this.client.categoria);
      });
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      nombreCliente: [this.client?.nombreCliente, [Validators.required]],
      apellidoCliente: [this.client?.apellidoCliente, [Validators.required]],
      categoria: [this.client?.categoria, [Validators.required]],
    });
  }

  add(): void {
    console.log(this.clientForm.value);

    if (!this.clientForm.valid) {
      return;
    }

    this._clientService
      .createClient({
        ...this.clientForm.value,
        id: 0,
      })
      .subscribe((resp) => console.log(resp));
  }

  submit(): void {
    if (!this.clientForm.valid) {
      return;
    }

    if (this.client?.idCliente) {
      this._clientService
        .updateClient({
          ...this.clientForm.value,
          idCliente: this.client.idCliente,
        })
        .subscribe(() => {
          this.showToast = true;
          this._router.navigateByUrl(`/client/${this.client.idCliente}`);
          setTimeout(() => (this.showToast = false), 3000);
        });

      return;
    }

    this._clientService
      .createClient({
        ...this.clientForm.value,
        id: 0,
      })
      .subscribe(() => {
        this.showToast = true;
        this._router.navigateByUrl('/list');
        setTimeout(() => (this.showToast = false), 3000);
      });
  }
}

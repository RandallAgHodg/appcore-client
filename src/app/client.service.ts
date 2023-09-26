import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Client } from './types';

const httpOptions = {
  headers: new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private readonly _http: HttpClient) {}

  createClient(client: Client) {
    return this._http
      .post(`http://localhost:5269/api/Cliente/Guardar`, client, httpOptions)
      .pipe(catchError((err) => of(err.error)));
  }

  getAllClients() {
    return this._http.get(
      'http://localhost:5269/api/Cliente/Lista',
      httpOptions
    );
  }

  getClientById(id: number) {
    return this._http.get(
      `http://localhost:5269/api/Cliente/Obtener/${id}`,
      httpOptions
    );
  }

  updateClient(client: Client) {
    return this._http.put(
      'http://localhost:5269/api/Cliente/Editar',
      client,
      httpOptions
    );
  }

  deleteClient(id: number) {
    return this._http.delete(
      `http://localhost:5269/api/Cliente/Eliminar/${id}`,
      httpOptions
    );
  }
}

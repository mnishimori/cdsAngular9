import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicoPrestado } from './servicos-prestados/servicoPrestado';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicosPrestadosService {

  apiUrl: string = environment.baseUrl + '/api/servicos-prestados';

  constructor(private http: HttpClient) { }

  create(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiUrl, servicoPrestado);
  }

  read(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado[]> {
    return this.http.get<ServicoPrestado[]>(this.apiUrl);
  }

  readByName(nome: string): Observable<ServicoPrestado[]> {
    var url: string = this.apiUrl;
    if (nome != null && nome.trim() != "") {
      url = this.apiUrl + '/cliente-nome/' + nome;
    }

    return this.http.get<ServicoPrestado[]>(url);
  }

  
}

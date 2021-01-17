import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './login/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.baseUrl + "/api/usuarios";
  tokenUrl: string = environment.baseUrl + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  tentarLogar( username: string, password: string ) : Observable<any> {
    const params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    return this.http.post( this.tokenUrl, params.toString(), { headers });
  }

  isAuthenticated(): boolean {
    const token: any = this.obterToken();

    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }

    return false;
  }

  obterToken(): any {
    const stringToken: string = localStorage.getItem("access_token");

    if (stringToken) {
      const token: any = JSON.parse(stringToken).access_token;
      return token;
    }

    return null;
  }

  encerrarSessao(){
    localStorage.removeItem("access_token");
  }

  recuperarUsuarioAutenticado(): string {
    const token = this.obterToken();
    if (token) {
      const usuario: string = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }
}

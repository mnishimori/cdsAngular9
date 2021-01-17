import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  cadastrando: boolean = false;
  mensagemSucessoCadastro: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit(): void {
    this.authService.tentarLogar(this.username, this.password)
    .subscribe(
      response => {
        console.log(response),
        this.router.navigate(['/home']);
      },
      errorResponse => {
        this.errors = ['Usuário e/ou senha inválido(s)'];
      }
    );
  }

  prepararCadastramento(event): void {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelarCadastro(): void {
    this.cadastrando = false;
    this.username = '';
    this.password = '';
    this.errors = [];
}

  cadastrar(): void {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.cadastrar(usuario).subscribe(
      response => {
        this.mensagemSucessoCadastro = "Cadastro realizado com sucesso!";
        this.cadastrando = false;
        this.errors = [];
      }, errorResponse => {
        this.mensagemSucessoCadastro = null;
        this.errors = errorResponse.error.errors;
      });
  }

}

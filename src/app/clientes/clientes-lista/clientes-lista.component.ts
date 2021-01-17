import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(private service: ClientesService, 
    private router: Router) { }

  ngOnInit(): void {
    this.service.read().subscribe(clientes => {
      this.clientes = clientes
    });
  }

  novoCadastro(): void {
    this.router.navigate(['/clientes/form']);
  }

  recuperarClienteParaDelecao(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
  }

  deletarCliente(): void {
    this.service.delete(this.clienteSelecionado).subscribe(
      response => { 
        this.mensagemSucesso = 'Cliente excluído com sucesso!' 
        this.ngOnInit();
      },
      error => this.mensagemErro = 'Ocorreu um erro ao excluir o cliente'
    );
  }

}

import { ServicosPrestadosService } from './../../servicos-prestados.service';
import { ServicoPrestado } from './../servicoPrestado';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicos-prestados-lista',
  templateUrl: './servicos-prestados-lista.component.html',
  styleUrls: ['./servicos-prestados-lista.component.css']
})
export class ServicosPrestadosListaComponent implements OnInit {

  nome: string;
  servicosPrestados: ServicoPrestado[] = [];
  message: string;

  constructor(private servicoPrestadoService: ServicosPrestadosService,
    private router: Router) { 
  }

  ngOnInit(): void {
  }

  consultar(): void {
    this.servicoPrestadoService.readByName(this.nome).subscribe(
      response => {
        this.servicosPrestados = response;
        if (this.servicosPrestados.length <= 0) {
          this.message = "Nenhum registro encontrado!";
        }
      }
    );
  }

  novoCadastro(): void {
    this.router.navigate(['/servicos-prestados/form']);
  }

}

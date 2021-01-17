import { ServicosPrestadosService } from './../../servicos-prestados.service';
import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestado } from '../servicoPrestado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicos-prestados-form',
  templateUrl: './servicos-prestados-form.component.html',
  styleUrls: ['./servicos-prestados-form.component.css']
})
export class ServicosPrestadosFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;
  id: number;
  success: boolean = false;
  errors: String[];

  constructor(private clienteService: ClientesService,
    private servicosPrestadosService: ServicosPrestadosService,
    private router: Router) {
    this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService.read().subscribe(response => this.clientes = response);
  }

  onSubmit(): void {
    this.servicosPrestadosService.create(this.servicoPrestado)
      .subscribe(response => {
        this.success = true;
        this.errors = [];
        this.servicoPrestado = new ServicoPrestado();
      },
        errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;

        }
      );
  }

  reset(): void {
    this.servicoPrestado = new ServicoPrestado();
    this.success = false;
    this.errors = [];
  }

  voltar(): void {
    this.router.navigate(['/servicos-prestados/lista']);
  }

}

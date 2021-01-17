import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  id: number;
  success: boolean = false;
  errors: String[];

  constructor(private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.id = +this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id != null && this.id > 0) {
      this.service.readById(this.id).subscribe(
        response => this.cliente = response,
        errorResponse => this.cliente = new Cliente()
      );
    }
  }

  onSubmit(): void {
    if (this.id != null && this.id > 0) {
      this.service.update(this.cliente).subscribe(
        response => {
          this.success = true;
          this.errors = [];
        },
        errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
      
    } else {
      this.service.create(this.cliente).subscribe(
        response => {
          this.cliente = response;
          this.success = true;
          this.errors = [];
        },
        errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }

  voltar(): void {
    this.router.navigate(['/clientes/lista']);
  }

  reset(): void {
    this.cliente = new Cliente();
    this.success = false;
    this.errors = [];
  }

}

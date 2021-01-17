import { LayoutComponent } from './../layout/layout.component';
import { ServicosPrestadosListaComponent } from './servicos-prestados-lista/servicos-prestados-lista.component';
import { ServicosPrestadosFormComponent } from './servicos-prestados-form/servicos-prestados-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'servicos-prestados',
    component: LayoutComponent,
    children: [
      {
        path: 'form',
        component: ServicosPrestadosFormComponent
      }, 
      {
        path: 'lista',
        component: ServicosPrestadosListaComponent
      },
      {
        path: '',
        redirectTo: '/servicos-prestados/lista', 
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosPrestadosRoutingModule { }

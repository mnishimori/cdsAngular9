import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './auth.service';
import { ServicosPrestadosService } from './servicos-prestados.service';
import { ServicosPrestadosModule } from './servicos-prestados/servicos-prestados.module';
import { ClientesService } from './clientes.service';
import { ClientesModule } from './clientes/clientes.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    ClientesModule,
    ServicosPrestadosModule
  ],
  providers: [
    ClientesService,
    ServicosPrestadosService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

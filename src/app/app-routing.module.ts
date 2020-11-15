import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component'
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/login/login.component'
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component'
import { ClienteInserirComponent } from './clientes/cliente-inserir/cliente-inserir.component'

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'lista', component: ClienteListaComponent},
  {path: 'criar', component: ClienteInserirComponent },
  { path: 'editar/:idCliente', component: ClienteInserirComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

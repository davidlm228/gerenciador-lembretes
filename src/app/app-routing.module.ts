import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../app/dashboard/dashboard.component'
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/login/login.component'
import { LembreteListaComponent } from './lembretes/lembrete-lista/lembrete-lista.component'
import { LembreteInserirComponent } from './lembretes/lembrete-inserir/lembrete-inserir.component'

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'lista', component: LembreteListaComponent},
  {path: 'criar', component: LembreteInserirComponent },
  { path: 'editar/:idLembrete', component: LembreteInserirComponent },
  { path: 'teste', component: NavBarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

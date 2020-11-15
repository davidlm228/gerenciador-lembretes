import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit, OnDestroy {


  clientes: Cliente[] = [];
  private clientesSubscription: Subscription;

  constructor(
    public clienteService: ClienteService,
    private router: Router

    ) {

  }

  ngOnInit(): void {
    this.clienteService.getClientes();
    this.clientesSubscription = this.clienteService
      .getListaDeClientesAtualizadaObservable()
      .subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;
      });
  }

  onDelete (id: string){
    this.clienteService.removerCliente(id);
  }

  ngOnDestroy(): void {
    this.clientesSubscription
  }
}
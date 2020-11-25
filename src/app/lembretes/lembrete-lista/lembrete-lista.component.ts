import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lembrete-lista',
  templateUrl: './lembrete-lista.component.html',
  styleUrls: ['./lembrete-lista.component.css'],
})
export class LembreteListaComponent implements OnInit, OnDestroy {


  lembretes: Lembrete[] = [];
  private lembretesSubscription: Subscription;

  constructor(
    public lembreteService: LembreteService,
    private router: Router

    ) {

  }

  ngOnInit(): void {
    this.lembreteService.getLembretes();
    this.lembretesSubscription = this.lembreteService
      .getListaDeLembretesAtualizadaObservable()
      .subscribe((lembretes: Lembrete[]) => {
        this.lembretes = lembretes;
      });
  }

  onDelete (id: string){
    this.lembreteService.removerLembrete(id);
  }

  ngOnDestroy(): void {
    this.lembretesSubscription
  }
}

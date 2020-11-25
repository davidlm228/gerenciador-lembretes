import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

import { Lembrete } from '../lembretes/lembrete.model';
import { LembreteService } from '../lembretes/lembrete.service';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../lembretes/dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  lembretes: Lembrete[] = [];
  private clientesSubscription: Subscription;

  constructor(
    public authenticationService:AuthenticationService,
    public lembreteService: LembreteService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  signOut() {
    this.authenticationService.SignOut();
    this.router.navigate(['']);
  }


  ngOnInit(): void {
    this.lembreteService.getLembretes();
    this.clientesSubscription = this.lembreteService
      .getListaDeLembretesAtualizadaObservable()
      .subscribe((lembretes: Lembrete[]) => {
        this.lembretes = lembretes;
      });
  }

  onDelete (id: string){
    this.lembreteService.removerLembrete(id);
  }

  ngOnDestroy(): void {
    this.clientesSubscription
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Lembrete } from './lembrete.model';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  private lembretes: Lembrete [] = [];
  private listaLembretesAtualizada = new Subject<Lembrete[]>();

  constructor(private httpClient: HttpClient) {

  }

  adicionarLembrete(nome: string, fone: string, datainicio: string): void {
    const lembrete: Lembrete = {
      id: null,
      nome: nome,
      fone: fone,
      datainicio: datainicio
    };
    this.httpClient.post<{ mensagem: string, id: string }>(
      'http://localhost:3000/api/lembretes',
      lembrete
    ).subscribe((dados) => {
      console.log(dados.mensagem)
      lembrete.id = dados.id;
      this.lembretes.push(lembrete);
      this.listaLembretesAtualizada.next([...this.lembretes]);
    })
  }

  atualizarLembrete(id: string, nome: string, fone: string, datainicio: string) {
    const lembrete: Lembrete = { id, nome, fone, datainicio };
    this.httpClient.put(`http://localhost:3000/api/lembretes/${id}`, lembrete)
      .subscribe((res => {
        const copia = [...this.lembretes];
        const indice = copia.findIndex(cli => cli.id === lembrete.id);
        copia[indice] = lembrete;
        this.lembretes = copia;
        this.listaLembretesAtualizada.next([...this.lembretes]);
      }));
  }

  removerLembrete (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/lembretes/${id}`)
    .subscribe(() => {
      console.log ("Remoção feita com sucesso")
      this.lembretes = this.lembretes.filter((cli) =>{
        return cli.id !== id
      })
      this.listaLembretesAtualizada.next([...this.lembretes]);
    });
  }

  getLembrete(idLembrete: string) {
    return this.httpClient.get<{
      _id: string, nome: string, fone: string,  datainicio: string
    }>(`http://localhost:3000/api/lembretes/${idLembrete}`);
  }

  getLembretes(): void {
    this.httpClient.get<{mensagem : string, lembretes: any}>(
      'http://localhost:3000/api/lembretes'
    )
    .pipe(map((dados) => {
      return dados.lembretes.map(cli => {
        return {
          id: cli._id,
          nome: cli.nome,
          fone: cli.fone,
          datainicio: cli.datainicio
        }
      })
    }))
    .subscribe((lembretes) => {
      this.lembretes = lembretes
      this.listaLembretesAtualizada.next([...this.lembretes])
    })

  }

  getListaDeLembretesAtualizadaObservable() {
    return this.listaLembretesAtualizada.asObservable();
  }



}

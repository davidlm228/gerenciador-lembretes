import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { LembreteService } from '../lembrete.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Lembrete } from '../lembrete.model';

@Component({
  selector: 'app-lembrete-inserir',
  templateUrl: './lembrete-inserir.component.html',
  styleUrls: ['./lembrete-inserir.component.css'],
})
export class LembreteInserirComponent implements OnInit{

  private modo: string = "criar";
  private idLembrete: string;
  public lembrete: Lembrete;
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLembrete")) {
        this.modo = "editar";
        this.idLembrete = paramMap.get("idLembrete");
        this.lembreteService.getLembrete(this.idLembrete).subscribe(dadosCli => {
          this.lembrete = {
            id: dadosCli._id,
            nome: dadosCli.nome,
            fone: dadosCli.fone,
            datainicio: dadosCli.datainicio
          };
        });
      }
      else {
        this.modo = "criar";
        this.idLembrete = null;
      }
    });
  }
  constructor (
    public lembreteService: LembreteService,
    public route: ActivatedRoute
  ){

  }

  onSalvarLembrete(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.modo === "criar") {
      this.lembreteService.adicionarLembrete(
        form.value.nome,
        form.value.fone,
        form.value.datainicio
      );
    }
    else {
      this.lembreteService.atualizarLembrete(
        this.idLembrete,
        form.value.nome,
        form.value.fone,
        form.value.datainicio
      )
    }
    form.resetForm();
  }
}

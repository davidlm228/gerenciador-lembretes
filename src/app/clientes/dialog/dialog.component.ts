import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
//import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  private modo: string = "criar";
  private idCliente: string;
  public cliente: Cliente;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idCliente")) {
        this.modo = "editar";
        this.idCliente = paramMap.get("idCliente");
        this.clienteService.getCliente(this.idCliente).subscribe(dadosCli => {
          this.cliente = {
            id: dadosCli._id,
            nome: dadosCli.nome,
            fone: dadosCli.fone,
            email: dadosCli.email
          };
        });
      }
      else {
        this.modo = "criar";
        this.idCliente = null;
      }
    });
  }

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public clienteService: ClienteService,
    public route: ActivatedRoute

  ) { }



















  cancel(): void {
    this.dialogRef.close();
  }

  onSalvarCliente(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.modo === "criar") {
      this.clienteService.adicionarCliente(
        form.value.nome,
        form.value.fone,
        form.value.email
      );
    }
    else {
      this.clienteService.atualizarCliente(
        this.idCliente,
        form.value.nome,
        form.value.fone,
        form.value.email
      )
    }
    form.resetForm();
  }

}

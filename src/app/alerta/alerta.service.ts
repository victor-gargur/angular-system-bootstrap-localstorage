import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  /*Alertas Componente Home*/
  /*Alerta Sucesso Criar Cadastro Componente Criar Cadastro*/
  sucessoCriarCadastro = false;
  alertaSucessoCriarCadastro() {
    this.sucessoCriarCadastro = true;
    setTimeout(() => {
      this.sucessoCriarCadastro = false;
    }, 3000);
  }
  /*Alerta Neutro Cancelar Cadastro*/
  cadastroCancelado = false;
  alertaCadastroCancelado() {
    this.cadastroCancelado = true;
    setTimeout(() => {
      this.cadastroCancelado = false;
    }, 3000);
  }

  /*Alertas Componente Criar Cadastro*/
  /*Alerta Falha Criar Cadastro Componente Criar Cadastro*/
  falhaCriarCadastro = false;
  alertaFalhaCriarCadastro() {
    this.falhaCriarCadastro = true;
    setTimeout(() => {
      this.falhaCriarCadastro = false;
    }, 3000);
  }
  /*Alerta Email Existente Componente Criar Cadastro*/
  emailExistente = false;
  alertaEmailExistente() {
    this.emailExistente = true;
    setTimeout(() => {
      this.emailExistente = false;
    }, 3000);
  }
  /*Alerta CPF Existente Componente Criar Cadastro*/
  cpfExistente = false;
  alertaCpfExistente() {
    this.cpfExistente = true;
    setTimeout(() => {
      this.cpfExistente = false;
    }, 3000);
  }

  /*Alertas Componente Lista Cadastros*/
  /*Alerta Sucesso Criar Lista Genérica*/
  sucessoCriarLista = false;
  alertaCriarLista() {
    this.sucessoCriarLista = true;
    setTimeout(() => {
      this.sucessoCriarLista = false;
    }, 3000);
  }

  /*Alerta Sucesso Excluir Lista Genérica*/
  sucessoExcluirLista = false;
  alertaExcluirLista() {
    this.sucessoExcluirLista = true;
    setTimeout(() => {
      this.sucessoExcluirLista = false;
    }, 3000);
  }

  /*Alertas Componente Editar Cadastro*/
  /*Alerta Sucesso Editar Cadastro Componente Editar Cadastro*/
  sucessoEditarCadastro = false;
  alertaSucessoEditarCadastro() {
    this.sucessoEditarCadastro = true;
    setTimeout(() => {
      this.sucessoEditarCadastro = false;
    }, 3000);
  }
  /*Alerta Falha Editar Cadastro Componente Editar Cadastro*/
  falhaEditarCadastro = false;
  alertaFalhaEditarCadastro() {
    this.falhaEditarCadastro = true;
    setTimeout(() => {
      this.falhaEditarCadastro = false;
    }, 3000);
  }

  /*Alertas Componente Editar Cadastro

  Alerta de sucesso
  <div
      class="alert-position alert alert-success d-flex align-items-center"
      role="alert"
      *ngIf="this.alertaService.nomeAlerta"
    >
      Texto do alerta
  </div>

  Div para alerta de falha
  

Div para alerta neutro

  <div
    class="alert-position alert alert-secondary"
    role="alert"
    *ngIf="this.alertaService.nomeAlerta"
  >
    Texto do alerta
  </div>

  */
}

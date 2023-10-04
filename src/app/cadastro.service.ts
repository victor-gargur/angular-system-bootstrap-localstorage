import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAlunoCadastro, IAlunoFormulario } from './aluno-interface';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  cadastros: IAlunoCadastro[] = [];

  dadosAluno: IAlunoCadastro | undefined;

  constructor(private route: Router) {}

  atualizarCadastros() {
    return JSON.parse(localStorage.getItem('cadastroAluno') || '[]');
  }

  autenticarEmailExistente(
    dadosCadastro: IAlunoFormulario,
    cadastrosAtuais: IAlunoCadastro[]
  ) {
    const autenticacao = cadastrosAtuais.find(
      (cadastro) => cadastro.emailAluno === dadosCadastro.emailAluno
    );
    if (autenticacao) {
      return true;
    }
    {
      return false;
    }
  }

  autenticarCpfExistente(
    dadosCadastro: IAlunoFormulario,
    cadastrosAtuais: IAlunoCadastro[]
  ) {
    const autenticacao = cadastrosAtuais.find(
      (cadastro) => cadastro.cpfAluno === dadosCadastro.cpfAluno
    );
    if (autenticacao) {
      return true;
    }
    {
      return false;
    }
  }

  gerarID() {
    if (this.cadastros.length === 0) {
      return 1;
    }
    {
      const idGerado = this.cadastros[this.cadastros.length - 1].idAluno + 1;
      return idGerado;
    }
  }

  cadastrarAluno(dadosAlunoFormulario: IAlunoFormulario) {
    this.cadastros = this.atualizarCadastros();
    this.dadosAluno = {
      idAluno: this.gerarID(),
      ...dadosAlunoFormulario,
    };
    this.cadastros.push(this.dadosAluno);

    localStorage.setItem('cadastroAluno', JSON.stringify(this.cadastros));
  }

  editarAluno(dadosAlunoEditado: IAlunoCadastro) {
    this.cadastros = this.atualizarCadastros();
    this.dadosAluno = {
      ...dadosAlunoEditado,
    };
    const indexAluno = this.cadastros.findIndex(
      (aluno) => aluno.idAluno === dadosAlunoEditado.idAluno
    );
    this.cadastros[indexAluno] = this.dadosAluno;

    localStorage.setItem('cadastroAluno', JSON.stringify(this.cadastros));
  }
}

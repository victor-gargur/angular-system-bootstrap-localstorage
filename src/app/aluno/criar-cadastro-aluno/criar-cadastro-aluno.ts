import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaComponent } from 'src/app/alerta/alerta.component';
import { AlertaService } from 'src/app/alerta/alerta.service';
import { IAlunoFormulario } from 'src/app/aluno-interface';
import { CadastroService } from 'src/app/cadastro.service';
import { IEscola, escolas } from 'src/app/escola';

@Component({
  selector: 'app-criar-cadastro-aluno',
  templateUrl: './criar-cadastro-aluno.component.html',
  styleUrls: ['./criar-cadastro-aluno.component.css'],
})
export class CriarCadastroAlunoComponent {
  escolas: IEscola[] = escolas;
  etapasFiltradas: IEscola | undefined;
  turmasFiltradas: string[] | undefined;
  /*Criação Form Reativo*/
  formControl = this.fb.group({
    nomeAluno: ['', [Validators.required, Validators.minLength(5)]],
    cpfAluno: ['', [Validators.minLength(11), Validators.required]],
    emailAluno: ['', [Validators.email, Validators.required]],
    escolaAluno: ['', [Validators.required]],
    etapaAluno: ['', [Validators.required]],
    turmaAluno: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    public alertaService: AlertaService,
    private alertaComponent: AlertaComponent,
    private router: Router
  ) {}

  /*Método para filtro de Etapas com base na Escola*/
  filtrarEtapas() {
    const etapasFiltradas = this.escolas.filter(
      (escola) => escola.nome === this.formControl.get('escolaAluno')?.value
    );
    return (this.etapasFiltradas = etapasFiltradas[0]);
  }
  /*Método para filtro de Turmas com base na Etapa*/
  filtrarTurmas() {
    const turmasFiltradas = this.etapasFiltradas?.turmas.filter((etapa) =>
      etapa.includes(this.formControl.get('etapaAluno')?.value!)
    );

    return (this.turmasFiltradas = turmasFiltradas);
  }
  /*Método para envio do formulário de cadastro*/
  formSubmit() {
    /*Atualizacao de dados de cadastros existentes e dos dados preenchidos para o novo cadastro*/
    const cadastros = this.cadastroService.atualizarCadastros();
    const dadosCadastroAluno: IAlunoFormulario = {
      nomeAluno: this.formControl.get('nomeAluno')!.value!,
      cpfAluno: this.formControl.get('cpfAluno')!.value!,
      emailAluno: this.formControl.get('emailAluno')!.value!,
      escolaAluno: this.formControl.get('escolaAluno')!.value!,
      etapaAluno: this.formControl.get('etapaAluno')!.value!,
      turmaAluno: this.formControl.get('turmaAluno')!.value!,
      resultadoAluno: 'Em curso',
    };
    /*Criação constante para validação de Email e CPF*/
    const autenticacaoEmail = this.cadastroService.autenticarEmailExistente(
      dadosCadastroAluno,
      cadastros
    );
    const autenticacaoCPF = this.cadastroService.autenticarCpfExistente(
      dadosCadastroAluno,
      cadastros
    );
    /*Validacao de Email e CPF existente*/
    if (!autenticacaoEmail && !autenticacaoCPF) {
      /*Validacao do Form Reativo*/
      if (this.formControl.valid) {
        this.cadastroService.cadastrarAluno(dadosCadastroAluno);
        this.router.navigate(['/home']);
        this.alertaService.alertaSucessoCriarCadastro();
      } else {
        this.alertaService.alertaFalhaCriarCadastro();
      }
    } else if (autenticacaoCPF) {
      this.alertaService.alertaCpfExistente();
    } else if (autenticacaoEmail) {
      this.alertaService.alertaEmailExistente();
    }
  }
  /*Função para cancelar a criação do cadastro*/
  cancelarCadastro() {
    this.router.navigate(['/home']);
    this.alertaService.alertaCadastroCancelado();
  }
}

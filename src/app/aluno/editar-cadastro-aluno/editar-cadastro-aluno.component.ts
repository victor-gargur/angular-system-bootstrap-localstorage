import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/alerta/alerta.service';
import { IAlunoCadastro } from 'src/app/aluno-interface';
import { CadastroService } from 'src/app/cadastro.service';
import { IEscola, escolas } from 'src/app/escola';

@Component({
  selector: 'app-editar-cadastro-aluno',
  templateUrl: './editar-cadastro-aluno.component.html',
  styleUrls: ['./editar-cadastro-aluno.component.css'],
})
export class EditarCadastroAlunoComponent implements OnInit {
  cadastrosAtuais: IAlunoCadastro[] = this.cadastroService.atualizarCadastros();
  // Criação do objeto para receber os dados do aluno
  cadastroEditado: IAlunoCadastro | undefined = {
    idAluno: 0,
    nomeAluno: '',
    cpfAluno: '',
    emailAluno: '',
    escolaAluno: '',
    etapaAluno: '',
    turmaAluno: '',
    resultadoAluno: '',
  };
  escolas: IEscola[] = escolas;
  etapasFiltradas: IEscola | undefined;
  turmasFiltradas: string[] | undefined;
  /*Criação Form Reativo*/
  formControl = this.fb.group({
    nomeAluno: ['', [Validators.required, Validators.minLength(5)]],
    cpfAluno: [
      '',
      [
        Validators.pattern(
          '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})'
        ),
        Validators.required,
      ],
    ],
    emailAluno: [
      '',
      [
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
        Validators.required,
      ],
    ],
    escolaAluno: ['', [Validators.required]],
    etapaAluno: ['', [Validators.required]],
    turmaAluno: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    public alertaService: AlertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.paramMap;
    const idAluno = Number(params.get('id'));
    this.cadastroEditado = this.cadastrosAtuais.find(
      (aluno) => aluno.idAluno === idAluno
    );
    // Atribuição dos dados do aluno ao form control para exibição e alteração
    this.formControl = this.fb.group({
      nomeAluno: [
        this.cadastroEditado?.nomeAluno || '',
        [Validators.required, Validators.minLength(5)],
      ],
      cpfAluno: [
        this.cadastroEditado?.cpfAluno || '',
        [
          Validators.pattern(
            '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})'
          ),
          Validators.required,
        ],
      ],
      emailAluno: [
        this.cadastroEditado?.emailAluno || '',
        [
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
          Validators.required,
        ],
      ],
      escolaAluno: [
        this.cadastroEditado?.escolaAluno || '',
        [Validators.required],
      ],
      etapaAluno: [
        this.cadastroEditado?.etapaAluno || '',
        [Validators.required],
      ],
      turmaAluno: [
        this.cadastroEditado?.turmaAluno || '',
        [Validators.required],
      ],
    });
    // Utilização dos métodos para atualização dos inputs etapas e turma
    this.filtrarEtapas();
    this.filtrarTurmas();
  }

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
    /*Atualizacao de dados de cadastros existentes e dos dados preenchidos para alteração do cadastro*/
    const cadastros = this.cadastroService.atualizarCadastros();
    const dadosCadastroAluno: IAlunoCadastro = {
      nomeAluno: this.formControl.get('nomeAluno')!.value!,
      cpfAluno: this.formControl.get('cpfAluno')!.value!,
      emailAluno: this.formControl.get('emailAluno')!.value!,
      escolaAluno: this.formControl.get('escolaAluno')!.value!,
      etapaAluno: this.formControl.get('etapaAluno')!.value!,
      turmaAluno: this.formControl.get('turmaAluno')!.value!,
      idAluno: this.cadastroEditado!.idAluno,
      resultadoAluno: this.cadastroEditado!.resultadoAluno,
    };
    /*Criação constante para validação de Email e CPF*/
    const autenticacaoEmail =
      this.cadastroService.autenticarEmailExistenteEditarCadastro(
        this.cadastroEditado!,
        dadosCadastroAluno,
        cadastros
      );
    const autenticacaoCPF =
      this.cadastroService.autenticarCpfExistenteEditarCadastro(
        this.cadastroEditado!,
        dadosCadastroAluno,
        cadastros
      );
    /*Validacao de Email e CPF existente*/
    if (!autenticacaoEmail && !autenticacaoCPF) {
      /*Validacao do Form Reativo*/
      if (this.formControl.valid) {
        this.cadastroService.editarAluno(dadosCadastroAluno);
        this.cadastroEditado! = dadosCadastroAluno;
        this.alertaService.alertaSucessoEditarCadastro();
      } else {
        this.alertaService.alertaFalhaCriarCadastro();
      }
    } else if (autenticacaoCPF) {
      this.alertaService.alertaCpfExistente();
    } else if (autenticacaoEmail) {
      this.alertaService.alertaEmailExistente();
    }
  }
  confirmarExcluirCadastro(teste: boolean) {
    if (teste) {
      return this.excluirCadastro();
    }
  }

  excluirCadastro() {
    const cadastroExcluido = this.cadastrosAtuais.filter(
      (aluno) => aluno.idAluno !== this.cadastroEditado!.idAluno
    );
    this.cadastrosAtuais = cadastroExcluido;
    localStorage.setItem('cadastroAluno', JSON.stringify(this.cadastrosAtuais));
    this.router.navigate(['/aluno/lista-cadastros']);
    this.alertaService.alertaSucessoExcluirCadastro();
  }
}

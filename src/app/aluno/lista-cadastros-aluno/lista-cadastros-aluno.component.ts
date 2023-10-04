import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/alerta/alerta.service';
import { IAlunoCadastro } from 'src/app/aluno-interface';
import { CadastroService } from 'src/app/cadastro.service';

@Component({
  selector: 'app-lista-cadastros-aluno',
  templateUrl: './lista-cadastros-aluno.component.html',
  styleUrls: ['./lista-cadastros-aluno.component.css'],
})
export class ListaCadastrosAlunoComponent implements OnInit {
  cadastrosAtuais: IAlunoCadastro[] = this.cadastroService.atualizarCadastros();
  // Dados para utilização do pagination
  registrosPorPagina: number = 10;
  paginaAtual: number = 1;
  totalRegistros: number = 0;
  //Propety para pesquisa do aluno
  dadoPesquisado: string | undefined;

  constructor(
    private router: Router,
    private cadastroService: CadastroService,
    private activatedRoute: ActivatedRoute,
    public alertaService: AlertaService
  ) {
    this.atualizarRegistrosPorPagina();
  }

  ngOnInit(): void {
    const cadastrosFiltrados: IAlunoCadastro[] =
      this.cadastroService.atualizarCadastros();

    //Método para pesquisa do aluno conforme parametro de consulta
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const descricao = params.get('consulta')?.toLowerCase();
      if (descricao) {
        this.cadastrosAtuais = cadastrosFiltrados.filter(
          (cadastro) =>
            cadastro.nomeAluno.toLowerCase().includes(descricao) ||
            cadastro.escolaAluno.toLowerCase().includes(descricao) ||
            cadastro.turmaAluno.toLowerCase().includes(descricao)
        );
        this.atualizarTotalRegistros();
      }
    });
  }

  //Métodos para ajuste dos registros por página de acordo com o tamanho da tela

  //Irá atualizar os registros de acordo com o tamanho da tela
  atualizarRegistrosPorPagina() {
    if (window.innerWidth < 1367) {
      this.registrosPorPagina = 8;
    } else {
      this.registrosPorPagina = 10;
    }
  }

  //Vincula a função anterior a observação de alteração do tamanho da tela
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.atualizarRegistrosPorPagina();
  }

  //Método estabelecimento do parametro de consulta
  pesquisarAluno() {
    if (this.dadoPesquisado) {
      this.router.navigate(['/aluno/lista-cadastros'], {
        relativeTo: this.activatedRoute,
        queryParams: { consulta: this.dadoPesquisado },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate(['/aluno/lista-cadastros'], {
        relativeTo: this.activatedRoute,
        queryParams: { consulta: this.dadoPesquisado },
        queryParamsHandling: 'merge',
      });
      this.cadastrosAtuais = this.cadastroService.atualizarCadastros();
      this.atualizarTotalRegistros();
    }
  }

  //Método para atualizar as páginas do pagiantion
  atualizarTotalRegistros() {
    this.totalRegistros = this.cadastrosAtuais.length;
  }

  //Método referente ao Modal para gerar Lista
  confirmarGerarLista(teste: boolean) {
    if (teste) {
      return this.gerarListaGenerica();
    }
  }

  //Método referente ao Modal para excluir Lista
  confirmarExcluirLista(teste: boolean) {
    if (teste) {
      return this.excluirLista();
    }
  }

  //Método para exclusão de lista de alunos genérica
  excluirLista() {
    localStorage.clear();
    this.atualizarTotalRegistros();
    this.cadastrosAtuais = this.cadastroService.atualizarCadastros();
    this.atualizarTotalRegistros();
    this.alertaService.alertaExcluirLista();
  }

  //Método para gerar lista de alunos genérica
  gerarListaGenerica() {
    const listaGenerica = [
      {
        idAluno: 1,
        nomeAluno: 'Ana Luiza da Silva Oliveira',
        cpfAluno: '12345678900',
        emailAluno: 'aluno1@example.com',
        escolaAluno: 'Escola São Francisco',
        etapaAluno: '1º ano',
        turmaAluno: '1º ano A',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 2,
        nomeAluno: 'João Carlos da Silva',
        cpfAluno: '23456789011',
        emailAluno: 'aluno2@example.com',
        escolaAluno: 'Escola Rio das Pedras',
        etapaAluno: '8º ano',
        turmaAluno: '8º ano A',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 3,
        nomeAluno: 'Marcos Vinicius dos Santos',
        cpfAluno: '34567890122',
        emailAluno: 'aluno3@example.com',
        escolaAluno: 'Escola Municipal Santa Mônica',
        etapaAluno: '4º ano',
        turmaAluno: '4º ano B',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 4,
        nomeAluno: 'Juliana Alves Pereira',
        cpfAluno: '45678901233',
        emailAluno: 'aluno4@example.com',
        escolaAluno: 'Escola São Francisco',
        etapaAluno: '3º ano',
        turmaAluno: '3º ano B',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 5,
        nomeAluno: 'Giovanna da Costa Souza',
        cpfAluno: '56789012344',
        emailAluno: 'aluno5@example.com',
        escolaAluno: 'Escola Municipal Santa Mônica',
        etapaAluno: '9º ano',
        turmaAluno: '9º ano C',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 6,
        nomeAluno: 'Maria Eduarda dos Santos',
        cpfAluno: '67890123455',
        emailAluno: 'aluno6@example.com',
        escolaAluno: 'Escola São Francisco',
        etapaAluno: '5º ano',
        turmaAluno: '5º ano A',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 7,
        nomeAluno: 'Daniel Rodrigues de Souza',
        cpfAluno: '78901234566',
        emailAluno: 'aluno7@example.com',
        escolaAluno: 'Escola Rio das Pedras',
        etapaAluno: '9º ano',
        turmaAluno: '9º ano B',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 8,
        nomeAluno: 'Luiz Felipe Pereira',
        cpfAluno: '89012345677',
        emailAluno: 'aluno8@example.com',
        escolaAluno: 'Escola Municipal Santa Mônica',
        etapaAluno: '7º ano',
        turmaAluno: '7º ano B',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 9,
        nomeAluno: 'Rafael da Costa Oliveira',
        cpfAluno: '90123456788',
        emailAluno: 'aluno9@example.com',
        escolaAluno: 'Escola São Francisco',
        etapaAluno: '4º ano',
        turmaAluno: '4º ano C',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 10,
        nomeAluno: 'Fernanda Rodrigues Lima',
        cpfAluno: '01234567899',
        emailAluno: 'aluno10@example.com',
        escolaAluno: 'Escola Municipal Santa Mônica',
        etapaAluno: '6º ano',
        turmaAluno: '6º ano C',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 11,
        nomeAluno: 'Eduardo Alves Nunes',
        cpfAluno: '12345678900',
        emailAluno: 'aluno11@example.com',
        escolaAluno: 'Escola São Francisco',
        etapaAluno: '2º ano',
        turmaAluno: '2º ano C',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 12,
        nomeAluno: 'Gustavo Silva Santos',
        cpfAluno: '23456789011',
        emailAluno: 'aluno12@example.com',
        escolaAluno: 'Escola Rio das Pedras',
        etapaAluno: '6º ano',
        turmaAluno: '6º ano A',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 13,
        nomeAluno: 'Luana Oliveira Silva',
        cpfAluno: '34567890122',
        emailAluno: 'aluno13@example.com',
        escolaAluno: 'Escola Municipal Santa Mônica',
        etapaAluno: '8º ano',
        turmaAluno: '8º ano C',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 14,
        nomeAluno: 'Marcelo Oliveira Santos',
        cpfAluno: '45678901233',
        emailAluno: 'aluno14@example.com',
        escolaAluno: 'Escola São Francisco',
        etapaAluno: '1º ano',
        turmaAluno: '1º ano C',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 15,
        nomeAluno: 'Isabela Santos Nunes',
        cpfAluno: '56789012344',
        emailAluno: 'aluno15@example.com',
        escolaAluno: 'Escola Municipal Santa Mônica',
        etapaAluno: '7º ano',
        turmaAluno: '7º ano A',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 16,
        nomeAluno: 'André Luiz da Costa',
        cpfAluno: '67890123455',
        emailAluno: 'aluno16@example.com',
        escolaAluno: 'Escola São Francisco',
        etapaAluno: '3º ano',
        turmaAluno: '3º ano C',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 17,
        nomeAluno: 'Bruno Henrique Pereira',
        cpfAluno: '78901234566',
        emailAluno: 'aluno17@example.com',
        escolaAluno: 'Escola Rio das Pedras',
        etapaAluno: '7º ano',
        turmaAluno: '7º ano C',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 18,
        nomeAluno: 'Caio dos Santos Lima',
        cpfAluno: '89012345677',
        emailAluno: 'aluno18@example.com',
        escolaAluno: 'Escola Municipal Santa Mônica',
        etapaAluno: '5º ano',
        turmaAluno: '5º ano C',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 19,
        nomeAluno: 'Camila Almeida Fernandes',
        cpfAluno: '90123456788',
        emailAluno: 'aluno19@example.com',
        escolaAluno: 'Escola São Francisco',
        etapaAluno: '4º ano',
        turmaAluno: '4º ano A',
        resultadoAluno: 'Em Curso',
      },
      {
        idAluno: 20,
        nomeAluno: 'Beatriz Pereira da Costa',
        cpfAluno: '01234567899',
        emailAluno: 'aluno20@example.com',
        escolaAluno: 'Escola Municipal Santa Mônica',
        etapaAluno: '1º ano',
        turmaAluno: '1º ano B',
        resultadoAluno: 'Em Curso',
      },
    ];
    localStorage.clear();
    localStorage.setItem('cadastroAluno', JSON.stringify(listaGenerica));

    this.cadastrosAtuais = this.cadastroService.atualizarCadastros();
    this.atualizarTotalRegistros();
    this.alertaService.alertaCriarLista();
  }
}

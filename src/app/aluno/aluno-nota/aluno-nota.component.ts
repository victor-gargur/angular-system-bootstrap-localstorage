import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IAlunoCadastro,
  IAlunoIdMedia,
  IAlunoIdNotas,
  IAlunoIdResultado,
  IDisciplinaMedias,
  IDisciplinaNotas,
  IDisciplinaResultado,
} from 'src/app/aluno-interface';

@Component({
  selector: 'app-aluno-nota',
  templateUrl: './aluno-nota.component.html',
  styleUrls: ['./aluno-nota.component.css'],
})
export class AlunoNotaComponent implements OnInit {
  cadastroAluno: IAlunoCadastro | undefined;
  //Propriedade para armazenar todas as notas de todas unidades
  notasAluno: IDisciplinaNotas = {
    portugues: [],
    matematica: [],
    historia: [],
    geografia: [],
    edFisica: [],
  };
  //Propriedade para armazenar a média das notas na disciplina
  mediaDisciplina: IDisciplinaMedias = {
    portugues: 0,
    matematica: 0,
    historia: 0,
    geografia: 0,
    edFisica: 0,
  };
  //Propriedade para armazenar o resultado pro disciplina
  resultadoDisciplina: IDisciplinaResultado = {
    portugues: 'Em curso',
    matematica: 'Em curso',
    historia: 'Em curso',
    geografia: 'Em curso',
    edFisica: 'Em curso',
  };
  //Propriedade de integração ID Aluno e Notas
  idNotasAluno: IAlunoIdNotas[] = [];
  //Propriedade de integração ID Aluno e Média
  idMediaAluno: IAlunoIdMedia[] = [];
  //Propriedade de integração ID Aluno e Resultado
  idResultadoAluno: IAlunoIdResultado[] = [];
  //Propriedade para armazenar o resultado do aluno para exibição na tela
  resultadoAluno = 'Em curso';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.paramMap;
    const alunoID = Number(params.get('id'));
    const cadastrosAtuais = JSON.parse(localStorage.getItem('cadastroAluno')!);
    this.cadastroAluno = cadastrosAtuais.find(
      (aluno: IAlunoCadastro) => aluno.idAluno === alunoID
    );
    this.idNotasAluno = JSON.parse(localStorage.getItem('notaAluno') || '[{}]');
    const indexNotas = this.idNotasAluno.findIndex(
      (aluno) => aluno.idAluno === this.cadastroAluno!.idAluno
    );
    if (indexNotas !== -1) {
      this.notasAluno = this.idNotasAluno[indexNotas].notasAluno;
    }
    this.idMediaAluno = JSON.parse(
      localStorage.getItem('mediaDisciplina') || '[{}]'
    );
    const indexMediaDisciplina = this.idMediaAluno.findIndex(
      (aluno) => aluno.idAluno === this.cadastroAluno!.idAluno
    );
    if (indexMediaDisciplina !== -1) {
      this.mediaDisciplina =
        this.idMediaAluno[indexMediaDisciplina].mediaDisciplina;
    }
    this.idResultadoAluno = JSON.parse(
      localStorage.getItem('resultadoAluno') || '[{}]'
    );
    const indexResultado = this.idResultadoAluno.findIndex(
      (aluno) => aluno.idAluno === this.cadastroAluno!.idAluno
    );
    if (indexResultado !== -1) {
      this.resultadoDisciplina =
        this.idResultadoAluno[indexResultado].resultadoDisciplina;
      this.resultadoAluno =
        this.idResultadoAluno[indexResultado].resultadoAluno;
    }
  }

  //Método para limitar nota mínima 0 e máxima 10
  limitarNotaMinMax(disciplina: keyof IDisciplinaNotas, index: number) {
    if (this.notasAluno[disciplina][index] > 10.0) {
      this.notasAluno[disciplina][index] = 10.0;
    }
    if (this.notasAluno[disciplina][index] < 0) {
      this.notasAluno[disciplina][index] = 0;
    }
    const nota = this.notasAluno[disciplina][index];
    const notaFormatada = parseFloat(nota.toFixed(1));
    this.notasAluno[disciplina][index] = notaFormatada;
  }

  //Método para atualizar o local notaAluno
  atualizarNota() {
    this.idNotasAluno = JSON.parse(localStorage.getItem('notaAluno') || '[{}]');
    const idNotasAluno: IAlunoIdNotas = {
      notasAluno: this.notasAluno,
      idAluno: this.cadastroAluno!.idAluno,
    };
    const indexAluno = this.idNotasAluno.findIndex(
      (aluno) => aluno.idAluno === idNotasAluno.idAluno
    );
    if (indexAluno === -1) {
      this.idNotasAluno.push(idNotasAluno);
      localStorage.setItem('notaAluno', JSON.stringify(this.idNotasAluno));
    } else {
      this.idNotasAluno[indexAluno] = idNotasAluno;
      localStorage.setItem('notaAluno', JSON.stringify(this.idNotasAluno));
    }
  }

  //Método para o calculo de média da disciplina
  calcularMedia(disciplina: keyof IDisciplinaNotas) {
    const notasDisciplina = this.notasAluno[disciplina];
    const somaNotas = notasDisciplina.reduce((prev, curr) => prev + curr) / 3;
    this.mediaDisciplina[disciplina] = parseFloat(somaNotas.toFixed(1));
    const idMediaAluno: IAlunoIdMedia = {
      mediaDisciplina: this.mediaDisciplina,
      idAluno: this.cadastroAluno!.idAluno,
    };
    const indexAluno = this.idMediaAluno.findIndex(
      (aluno) => aluno.idAluno === idMediaAluno.idAluno
    );
    if (indexAluno === -1) {
      this.idMediaAluno.push(idMediaAluno);
      localStorage.setItem(
        'mediaDisciplina',
        JSON.stringify(this.idMediaAluno)
      );
    } else {
      this.idMediaAluno[indexAluno] = idMediaAluno;
      localStorage.setItem(
        'mediaDisciplina',
        JSON.stringify(this.idMediaAluno)
      );
    }
  }

  //Método para calcular e criar os locais de resultado
  calcularResultado(disciplina: keyof IDisciplinaResultado) {
    //Calculo resultado disciplina
    if (
      this.notasAluno[disciplina].length === 3 &&
      this.notasAluno[disciplina][0] &&
      this.notasAluno[disciplina][1] !== undefined
    ) {
      if (this.mediaDisciplina[disciplina] >= 6) {
        this.resultadoDisciplina[disciplina] = 'Aprovado';
      } else {
        this.resultadoDisciplina[disciplina] = 'Reprovado';
      }
    }
    console.log(this.notasAluno[disciplina][0]);
    this.resultadoAluno = this.calcularResultadoFinal();
    const idResultadoAluno = {
      idAluno: this.cadastroAluno!.idAluno,
      resultadoDisciplina: this.resultadoDisciplina,
      resultadoAluno: this.resultadoAluno,
    };
    //Criação do local resultadoAluno para atualização da tela aluno-nota
    const indexAluno = this.idResultadoAluno.findIndex(
      (aluno) => aluno.idAluno === idResultadoAluno.idAluno
    );
    if (indexAluno === -1) {
      this.idResultadoAluno.push(idResultadoAluno);
      localStorage.setItem(
        'resultadoAluno',
        JSON.stringify(this.idResultadoAluno)
      );
    } else {
      this.idResultadoAluno[indexAluno] = idResultadoAluno;
      localStorage.setItem(
        'resultadoAluno',
        JSON.stringify(this.idResultadoAluno)
      );
    }
    //Alteração do resultado final no local cadastroAluno
    let cadastrosAtuais = JSON.parse(localStorage.getItem('cadastroAluno')!);
    const params = this.activatedRoute.snapshot.paramMap;
    const alunoID = Number(params.get('id'));

    const indexAlunoCadastros = cadastrosAtuais.findIndex(
      (aluno: { idAluno: number }) => aluno.idAluno === alunoID
    );
    cadastrosAtuais[indexAlunoCadastros].resultadoAluno =
      this.calcularResultadoFinal();
    localStorage.setItem('cadastroAluno', JSON.stringify(cadastrosAtuais));
  }

  //Método para varredura dos resultados por disciplina, para definir o resultado
  calcularResultadoFinal() {
    let emCurso = false;
    let reprovado = false;
    for (const disciplina in this.resultadoDisciplina) {
      if (this.resultadoDisciplina[disciplina] === 'Em curso') {
        emCurso = true;
      } else if (this.resultadoDisciplina[disciplina] === 'Reprovado') {
        reprovado = true;
      }
    }
    if (emCurso) {
      return 'Em Curso';
    } else if (reprovado) {
      return 'Reprovado';
    } else {
      return 'Aprovado';
    }
  }
}

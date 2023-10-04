export interface IAlunoFormulario {
  nomeAluno: string;
  cpfAluno: string;
  emailAluno: string;
  escolaAluno: string;
  etapaAluno: string;
  turmaAluno: string;
  resultadoAluno: string;
}

export interface IAlunoCadastro extends IAlunoFormulario {
  idAluno: number;
}

export interface IAlunoNotas {
  idAluno: number;
  nomeAluno: string;
  escolaAluno: string;
  etapaAluno: string;
  turmaAluno: string;
}

export interface IDisciplinaNotas {
  [key: string]: number[];
}

export interface IDisciplinaMedias {
  [key: string]: number;
}

export interface IDisciplinaResultado {
  [key: string]: string;
}

export interface IAlunoIdNotas {
  idAluno: number;
  notasAluno: {};
}

export interface IAlunoIdMedia {
  idAluno: number;
  mediaDisciplina: {};
}

export interface IAlunoIdResultado {
  idAluno: number;
  resultadoDisciplina: IDisciplinaResultado;
  resultadoAluno: string;
}

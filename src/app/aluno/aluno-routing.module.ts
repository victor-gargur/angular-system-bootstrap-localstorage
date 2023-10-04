import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoNotaComponent } from './aluno-nota/aluno-nota.component';
import { AlunoComponent } from './aluno.component';
import { CriarCadastroAlunoComponent } from './criar-cadastro-aluno/criar-cadastro-aluno';
import { EditarCadastroAlunoComponent } from './editar-cadastro-aluno/editar-cadastro-aluno.component';
import { ListaCadastrosAlunoComponent } from './lista-cadastros-aluno/lista-cadastros-aluno.component';

const routes: Routes = [
  { path: '', component: AlunoComponent },
  { path: 'criar-cadastro', component: CriarCadastroAlunoComponent },
  { path: 'lista-cadastros', component: ListaCadastrosAlunoComponent },
  { path: 'aluno-nota/:id', component: AlunoNotaComponent },
  { path: 'editar-cadastro/:id', component: EditarCadastroAlunoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunoRoutingModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlunoRoutingModule } from './aluno-routing.module';
import { AlunoComponent } from './aluno.component';
import { CriarCadastroAlunoComponent } from './criar-cadastro-aluno/criar-cadastro-aluno';
import { EditarCadastroAlunoComponent } from './editar-cadastro-aluno/editar-cadastro-aluno.component';
import { ListaCadastrosAlunoComponent } from './lista-cadastros-aluno/lista-cadastros-aluno.component';
import { AlunoNotaComponent } from './aluno-nota/aluno-nota.component';

@NgModule({
  declarations: [
    AlunoComponent,
    CriarCadastroAlunoComponent,
    EditarCadastroAlunoComponent,
    ListaCadastrosAlunoComponent,
    AlunoNotaComponent,
  ],
  imports: [
    CommonModule,
    AlunoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatSnackBarModule,
    NgxPaginationModule,
  ],
  providers: [provideNgxMask()],
})
export class AlunoModule {}

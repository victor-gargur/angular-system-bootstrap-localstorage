import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCadastroAlunoComponent } from './editar-cadastro-aluno.component';

describe('EditarCadastroAlunoComponent', () => {
  let component: EditarCadastroAlunoComponent;
  let fixture: ComponentFixture<EditarCadastroAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCadastroAlunoComponent]
    });
    fixture = TestBed.createComponent(EditarCadastroAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

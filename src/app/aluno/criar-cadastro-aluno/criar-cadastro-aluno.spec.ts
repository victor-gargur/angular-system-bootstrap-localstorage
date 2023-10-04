import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCadastroAlunoComponent } from './criar-cadastro-aluno';

describe('CriarCadastroAlunoComponent', () => {
  let component: CriarCadastroAlunoComponent;
  let fixture: ComponentFixture<CriarCadastroAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarCadastroAlunoComponent],
    });
    fixture = TestBed.createComponent(CriarCadastroAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

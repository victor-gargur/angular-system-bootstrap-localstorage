import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCadastrosAlunoComponent } from './lista-cadastros-aluno.component';

describe('ListaCadastrosAlunoComponent', () => {
  let component: ListaCadastrosAlunoComponent;
  let fixture: ComponentFixture<ListaCadastrosAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCadastrosAlunoComponent]
    });
    fixture = TestBed.createComponent(ListaCadastrosAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

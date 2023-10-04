import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoNotaComponent } from './aluno-nota.component';

describe('AlunoNotaComponent', () => {
  let component: AlunoNotaComponent;
  let fixture: ComponentFixture<AlunoNotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlunoNotaComponent]
    });
    fixture = TestBed.createComponent(AlunoNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

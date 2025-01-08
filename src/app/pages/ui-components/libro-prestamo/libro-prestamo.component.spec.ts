import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroPrestamoComponent } from './libro-prestamo.component';

describe('LibroPrestamoComponent', () => {
  let component: LibroPrestamoComponent;
  let fixture: ComponentFixture<LibroPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroPrestamoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibroPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

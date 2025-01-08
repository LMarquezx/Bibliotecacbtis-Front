import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-libro-prestamo',
  templateUrl: './libro-prestamo.component.html',
  styleUrl: './libro-prestamo.component.scss'
})
export class LibroPrestamoComponent implements OnInit {
  prestamoForm: FormGroup;
  libros: string[] = ['Libro 1', 'Libro 2', 'Libro 3', 'Libro 4', 'Libro 5']; // Lista de ejemplo

  constructor(private fb: FormBuilder) {
    this.prestamoForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      numeroControl: ['', Validators.required],
      especialidad: ['', Validators.required],
      semestre: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      libro: ['', Validators.required],
      fechaDevolucion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.prestamoForm.valid) {
      console.log(this.prestamoForm.value);
      // Aquí puedes agregar la lógica para enviar los datos del formulario
    } else {
      console.log('Formulario inválido');
    }
  }
}

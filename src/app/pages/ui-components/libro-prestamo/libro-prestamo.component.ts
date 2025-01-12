import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from 'src/app/services/libros.service';
import { Libro } from 'src/app/models/libros';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import {v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-libro-prestamo',
  templateUrl: './libro-prestamo.component.html',
  styleUrls: ['./libro-prestamo.component.scss'],
})
export class LibroPrestamoComponent implements OnInit {
  prestamoForm: FormGroup;
  Libros: Libro[] = [];
  librosPaginados: Libro[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private searchSubject = new Subject<string>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly librosService: LibrosService
  ) {
    this.prestamoForm = this.fb.group({
      _id:uuidv4(),
      nombreCompleto: ['', Validators.required],
      noControl: ['', Validators.required],
      especialidad: ['', Validators.required],
      semestre: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      id_libro: [''],
      tituloLibro: [''],
      fechaDevolucion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getLibrosPrestamos();

    // Escuchar cambios en el campo de búsqueda
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((termino) => {
      this.filtrarLibros(termino);
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.updateLibrosPaginados());
  }

  updateLibrosPaginados() {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.librosPaginados = this.Libros.slice(startIndex, startIndex + this.paginator.pageSize);
    }
  }

  getLibrosPrestamos(): void {
    this.librosService.getLibrosPrestamos().subscribe({
      next: (data) => {
        this.Libros = data;
        this.updateLibrosPaginados();
        console.log('Libros obtenidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener libros:', err);
      },
    });
  }

  filtrarLibros(termino: string): void {
    if (!termino.trim()) {
      this.librosService.getLibrosPrestamos().subscribe({
        next: (data) => {
          this.Libros = data;
          this.updateLibrosPaginados();
        },
        error: (err) => {
          console.error('Error al obtener libros:', err);
        },
      });
    } else {
      this.librosService.filtrarLibroPrestamo({ titulo: termino }).subscribe({
        next: (data) => {
          this.Libros = data;
          this.updateLibrosPaginados();
        },
        error: (err) => {
          console.error('Error al filtrar libros:', err);
        },
      });
    }
  }

  onBuscarTitulo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value); // Emitir el valor al Subject
  }

  seleccionarLibro(libro: Libro) {
    this.prestamoForm.patchValue({ tituloLibro: libro.Titulo, id_libro: libro.id_libro });
  }

  onSubmit() {
    if (this.prestamoForm.valid) {
      const prestamoData = this.prestamoForm.value;
      this.librosService.createPrestamo(prestamoData).subscribe({
        next: (response) => {
          console.log('Préstamo creado correctamente', response);
        },
        error: (error) => {
          console.error('Error al crear el préstamo', error);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}

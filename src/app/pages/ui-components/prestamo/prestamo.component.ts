import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from 'src/app/services/libros.service';
import { Prestamo } from 'src/app/models/prestamo';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrl: './prestamo.component.scss'
})
export class PrestamoComponent implements OnInit {

  prestamo: Prestamo[] = [];
  prestamosPaginados: Prestamo[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private searchSubject = new Subject<string>();

  constructor(private readonly librosService: LibrosService) {}

  ngOnInit(): void {
    this.getPrestamos();

    // Escuchar cambios en el campo de búsqueda
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((termino) => {
      this.filtrarPrestamos(termino);
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.updatePrestamosPaginados());
  }

  onBuscarNombre(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value); // Emitir el valor al Subject
  }

  filtrarPrestamos(termino: string): void {
    if (!termino.trim()) {
      this.librosService.getAllPrestamos().subscribe({
        next: (data) => {
          this.prestamo = data;
          this.updatePrestamosPaginados();
        },
        error: (err) => {
          console.error('Error al obtener el listado:', err);
        },
      });
    } else {
      this.librosService.filterPrestamo({ nombreCompleto: termino }).subscribe({
        next: (data) => {
          this.prestamo = data;
          this.updatePrestamosPaginados();
        },
        error: (err) => {
          console.error('Error al filtrar el listado:', err);
        },
      });
    }
  }

  updatePrestamosPaginados() {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.prestamosPaginados = this.prestamo.slice(startIndex, startIndex + this.paginator.pageSize);
    }
  }

  getPrestamos(): void {
    this.librosService.getAllPrestamos().subscribe({
      next: (data) => {
        this.prestamo = data;
        this.updatePrestamosPaginados();
        console.log('Prestamos obtenidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener Prestamos:', err);
      },
    });
  }

  mostrarFormulario = false;
  mostrarTabla = false;

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarTabla = false;
    // Reinicia la búsqueda cuando se cierra el formulario
  }
  
  toggleTabla() {
    this.mostrarTabla = !this.mostrarTabla;
    this.mostrarFormulario = false;
    if (this.mostrarTabla) {
      this.getPrestamos(); // Asegúrate de que la tabla y la búsqueda se inicien correctamente
    }
  }
}

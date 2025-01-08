import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'titulo', 'Autor', 'Anio_publicacion', 'Editorial', 'categoria_id', 'Estado'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private librosService: LibrosService) {}

  ngOnInit(): void {
    this.getLibros();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getLibros(): void {
    this.librosService.getLibros().subscribe({
      next: (data) => {
        this.dataSource.data = data; 
        console.log('Libros obtenidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener libros:', err);
      },
    });
  }
  filterBooks(catId: string): void {
    this.librosService.filterByCategoria(catId).subscribe({
      next: (response) => {
        console.log('Libros encontrados:', response);
        this.dataSource.data = response;
      },
      error: (err) => {
        console.error('Error al filtrar libros:', err);
      },
    });
  }

  categorias = [
    { id: '1', nombre: 'CIENCIAS BIOLOGICAS, QUIMICAS Y DE LA SALUD', color: 'primary' },
    { id: '2', nombre: 'CIENCIAS FISICO-MATEMATICAS E INGENIERIAS', color: 'accent' },
    { id: '3', nombre: 'CIENCIAS SOCIALES', color: 'warn' },
    { id: '4', nombre: 'HUMANIDADES Y ARTE', color: 'primary' },
    { id: '5', nombre: 'TECNOLOGIA', color: 'accent' },
    { id: '6', nombre: 'ADMINISTRACION Y GESTION', color: 'warn' },
  ];
}


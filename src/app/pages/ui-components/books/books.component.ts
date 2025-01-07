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
    console.log(this.paginator);
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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/libros`);
  }

  createLibro(libro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, libro);
  }

  updateLibro(id: string, libro: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/libros/${id}`, libro);
  }

  deleteLibro(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  filterByCategoria(cat:string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/libros/byCategoria`,{cat});
  }

  getLibrosPrestamos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/libros/prestamo`);
  }

  createPrestamo(prestamo:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/prestamo`,prestamo);
  }

  getAllPrestamos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/prestamos/all`);
  }

  filterPrestamo(Prestamo:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/prestamos/byName`,Prestamo);
  }

  filtrarLibroPrestamo(libroPrestamo:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/libros/filterName`,libroPrestamo);
  }
}

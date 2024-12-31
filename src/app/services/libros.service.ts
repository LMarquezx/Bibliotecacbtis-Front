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
}

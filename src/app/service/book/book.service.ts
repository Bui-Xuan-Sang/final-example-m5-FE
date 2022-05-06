import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../../model/book';

export const API_URL = `${environment.apiURL}`;
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_URL}/books`);
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${API_URL}/books/${id}`);
  }

  createBook(book: Book) {
    return this.http.post<Book[]>(`${API_URL}/books`, book);
  }

  updateBook(id: number, book: Book) {
    return this.http.put<Book[]>(`${API_URL}/books/${id}`, book);
  }

  deleteBook(id: number): Observable<Book[]> {
    return this.http.delete<Book[]>(`${API_URL}/books/${id}`);
  }
}

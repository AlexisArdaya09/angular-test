import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentViewerService {

  private baseUrl = 'assets/data/';

  constructor(private http: HttpClient) { }

  getDocument(id: number): Observable<any> {
    const url = `${this.baseUrl}${id}.json`;
    return this.http.get<any>(url);
  }
}

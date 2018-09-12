import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const apiUrl = 'localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Algo deu errado');
  }

  private extractData(res: Response) {
    return res || {};
  }

  getClassroom(): Observable<any> {
    return this.http
      .get(apiUrl, httpOptions)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  getClassroomById(id: string) {
    const url = `${apiUrl}/${id}`;
    return this.http
      .get(url, httpOptions)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  postClassroom(data: any): Observable<any> {
    const url = `${apiUrl}/add_with_students`;
    return this.http
      .post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateClassroom(id: string, data: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteClassroom(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}

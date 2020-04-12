import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Project } from './project.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = environment.apiEndPoint;
  constructor(
    private http: HttpClient
  ) { }

  save(project: Project): Observable<Project> {
    return this.http.post(`${this.url}/api/project`, project, httpOptions)
      .pipe(
        catchError(err => {
          console.log('save project ', err);
          return throwError(err);
        })
      );
  }

  update(id: string, project: Project): Observable<Project> {
    return this.http.put(`${this.url}/api/project/${id}`, project, httpOptions)
      .pipe(
        catchError(err => {
          console.log('update project ', err);
          return throwError(err);
        })
      );
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/api/project`, httpOptions)
      .pipe(
        catchError(err => {
          console.log('save project ', err);
          return throwError(err);
        })
      );
  }

  addTask(projectId: string, task: any): Observable<Project> {
    return this.http.put(`${this.url}/api/project/${projectId}`, task, httpOptions)
      .pipe(
        catchError(err => {
          console.log('update project ', err);
          return throwError(err);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, of } from 'rxjs';
import { Answer } from '../models';
import { AuthService } from '../../../services/auth.service';

const API_URL = environment.endpoint + '/answers';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) { }

  public get(id: string): Observable<Answer> {
    return this.http.get<Answer>(`${API_URL}/${id}`);
  }

  public loadAllAnswerFromTicket(id: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(API_URL).pipe(map(answers => answers.filter(answer => answer.ticket === id)));
  }

  public add(ticketId: string, message: string): Observable<Answer> {
    const answer: Partial<Answer> = {
      author: this.authService.curentUserID,
      createdDate: new Date(),
      ticket: ticketId,
      message
    };
    return this.http.post<Answer>(API_URL, answer);
  }

  public edit(id: string, message: string): Observable<void | Error> {
    return this.get(id)
      .pipe(
        switchMap(answer => {
          if (!answer) return of(new Error('The answer doesn\'t exists'));
          if (answer.author !== this.authService.curentUserID) return of(new Error('You can\'t edit other\'s answers'));
          answer.message = message;
          return this.http.put<void>(`${API_URL}/${id}`, answer);
        })
      );
  }

  public delete(id: string): Observable<void | Error> {
    return this.get(id)
      .pipe(
        switchMap(answer => {
          if (!answer) return of(new Error('The answer doesn\'t exists'));
          if (answer.author !== this.authService.curentUserID) return of(new Error('You can\'t delete other\'s answers'));
          return this.http.delete<void>(`${API_URL}/${id}`);
        })
      );
  }
}

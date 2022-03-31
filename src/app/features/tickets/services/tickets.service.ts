import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services';
import { Ticket } from '../models';

const API_URL = environment.endpoint + '/tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) { }

  public loadAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(API_URL);
  }

  public get(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${API_URL}/${id}`);
  }

  public open(message: string): Observable<Ticket> {
    const ticket: Partial<Ticket> = {
      author: this.authService.curentUserID,
      creationDate: new Date(),
      status: 'NEW',
      answers: [],
      message,
    };
    return this.http.post<Ticket>(API_URL, ticket);
  }

  public edit(id: string, message: string): Observable<void | Error> {
    return this.get(id)
      .pipe(
        switchMap(ticket => {
          if (!ticket) return of(new Error('The ticket doesn\'t exists'));
          if (this.authService.curentUserID !== ticket.author) return of(new Error('You can\'t edit other\'s tickets'));
          if (ticket.status !== 'NEW') return of(new Error('The ticket has answers so it cannot be edited'));
          ticket.message == message;
          return this.http.put<void>(`${API_URL}/${id}`, ticket);
        }));
  }

  public addAnswer(ticketID: string, answerID: string): Observable<void | Error> {
    return this.get(ticketID)
      .pipe(
        switchMap(ticket => {
          if (!ticket) return of(new Error('The ticket doesn\'t exists'));
          if (ticket.status === 'CLOSED') return of(new Error('Cannot answer a closed ticket'));
          if (this.authService.curentUserID === ticket.author) return of(new Error('You can\'t answer your tickets'));
          ticket.status = 'ANSWERED';
          ticket.answers.push(answerID);
          return this.http.put<void>(`${API_URL}/${ticketID}`, ticket);
        }));
  }

  public deleteAnswer(ticketID: string, answerID: string): Observable<void | Error> {
    return this.get(ticketID)
      .pipe(
        switchMap(ticket => {
          if (!ticket) return of(new Error('The ticket doesn\'t exists'));
          if (ticket.status === 'CLOSED') return of(new Error('Cannot delete the answer from a closed ticket'));
          if (this.authService.curentUserID === ticket.author) return of(new Error('You can\'t delete answers from your tickets'));
          ticket.answers = ticket.answers.filter(id => id !== answerID);
          ticket.status = ticket.answers.length > 0 ? 'ANSWERED' : 'NEW';
          return this.http.put<void>(`${API_URL}/${ticketID}`, ticket);
        }));
  }

  public closeTicket(id: string): Observable<void | Error> {
    return this.get(id)
      .pipe(
        switchMap(ticket => {
          if (!ticket) return of(new Error('The ticket doesn\'t exists'));
          if (this.authService.curentUserID !== ticket.author) return of(new Error('You can\'t close other\'s tickets'));
          if (ticket.status !== 'ANSWERED') return of(new Error('Cannot close the ticket'));
          ticket.status = 'CLOSED';
          ticket.closedDate = new Date();
          return this.http.put<void>(`${API_URL}/${id}`, ticket);
        }));
  }

  public delete(id: string): Observable<void | Error> {
    return this.get(id)
      .pipe(
        switchMap(ticket => {
          if (!ticket) return of(new Error('The ticket doesn\'t exists'));
          if (this.authService.curentUserID !== ticket.author) return of(new Error('You can\'t delete other\'s tickets'));
          if (ticket.status !== 'NEW') return of(new Error('The ticket has answers, so it cannot be deleted'));
          return this.http.delete<void>(`${API_URL}/${id}`);
        }));
  }
}

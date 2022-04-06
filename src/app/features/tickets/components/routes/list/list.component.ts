import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import { EMPTY, Observable, tap, BehaviorSubject, combineLatest, map, catchError, of } from 'rxjs';
import { Ticket } from '../../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private _tickets$ = new BehaviorSubject<Ticket[]>([]);
  private _page$ = new BehaviorSubject<number>(0);
  private _itemsPerPage$ = new BehaviorSubject<number>(10);

  public get page() { return this._page$.getValue(); }
  public set page(val: number) { this._page$.next(val < 0 ? 0 : val); }
  public get totalItems() { return this._tickets$.getValue().length; }
  public get itemsPerPage() { return this._itemsPerPage$.getValue(); }
  public set itemsPerPage(val: number) { this._itemsPerPage$.next(val <= 0 ? Infinity : val); }
  public tickets$ = combineLatest([
    this._tickets$.asObservable(),
    this._page$.asObservable(),
    this._itemsPerPage$.asObservable()
  ]).pipe(map(([tickets, page, itemsPerPage]) => tickets.slice(page * itemsPerPage, (page + 1) * itemsPerPage)));

  constructor(private service: TicketsService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  private loadTickets() {
    this.service.loadAll()
      .pipe(catchError(() => of([])), tap(() => this.page = 0))
      .subscribe(tickets => this._tickets$.next([...tickets]));
  }

  public close(id: string) {
    if(confirm('Are you sure?')) {
      this.service.closeTicket(id).subscribe(() => this.loadTickets());
    }
  }

  public delete(id: string) {
    if(confirm('Are you sure?')) {
      this.service.delete(id).subscribe(() => this.loadTickets());
    }
  }

}

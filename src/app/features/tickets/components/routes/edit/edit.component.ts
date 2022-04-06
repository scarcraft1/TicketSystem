import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil, switchMap, tap, filter } from 'rxjs';
import { TicketsService } from '../../../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ticket } from '../../../models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private _ticket?: Ticket;
  private _ticketId?: string;
  private readonly ticketId$ = this.route.paramMap
    .pipe(
      takeUntil(this.destroy$),
      map(params => params.get('id')));

  public form: FormGroup;
  public submitted = false;

  constructor(
    private readonly service: TicketsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map(params => params.get('id')),
        tap(id => Boolean(id) ? this.router.navigate(['../..']) : null),
        map(id => `${id}`),
        filter(Boolean),
        tap(id => this._ticketId = id),
        switchMap((id: string) => this.service.get(id)))
      .subscribe(ticket => {
        this._ticket = ticket;
        this.resetForm();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submit() {
    this.submitted = true;
    if (this.form.valid) {
      this.service.edit(this._ticketId as string, this.form.get('message')?.value)
        .subscribe(() => this.router.navigate(['../..']));
    }
  }

  public resetForm(): void {
    this.submitted = false;
    this.form.reset(this._ticket);
  }

  private createForm(): FormGroup {
    return this.fb.group({ message: ['', [Validators.required, Validators.maxLength(300)]] });
  }

}

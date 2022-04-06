import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../../services/tickets.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  public form: FormGroup;
  public submitted = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: TicketsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    this.form = this.createForm();
  }

  public submit() {
    this.submitted = true;
    if(this.form.valid) {
      this.service.open(this.form.get('message')?.value)
      .subscribe(() => this.router.navigate(['..'], { relativeTo: this.route }));
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({ message: ['', [Validators.required, Validators.maxLength(300)]]});
  }

}

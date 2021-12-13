import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { List } from 'immutable';

import { EmployeeData } from '../shared/list-generator.service';

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

@Component({
  selector: 'app-employee-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 title="Department">{{ department }}</h1>

    <mat-form-field>
      <input placeholder="Enter name here" matInput type="text" [(ngModel)]="label" (keydown)="handleKey($event)">
    </mat-form-field>

    <mat-list>
      <div *ngIf="data.length === 0" class="empty-list-label">Empty list</div>
      <mat-list-item *ngFor="let item of data">
        <h3 matLine title="Name">
          {{ item.label }}
        </h3>
        <mat-chip-list>
          <mat-chip title="Score" class="mat-chip mat-primary mat-chip-selected" color="primary" selected="true">
            {{ calculate(item.num) }}
            <!-- {{ item.num | calculate }} -->
          </mat-chip>
        </mat-chip-list>
        <i title="Delete" class="fa fa-trash-o" aria-hidden="true" (click)="remove.emit(item)"></i>
      </mat-list-item>
      <mat-divider *ngIf="data.length !== 0"></mat-divider>
    </mat-list>
  `,
  styleUrls: ['employee-list.component.css']
})
export class EmployeeListComponent {
  @Input() data!: Array<EmployeeData>;
  @Input() department!: string;

  @Output() remove = new EventEmitter<EmployeeData>();
  @Output() add = new EventEmitter<string>();

  label!: string;

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.add.emit(this.label);
      this.label = '';
    }
  }

  calculate(num: number) {
    console.log(`Calculating ${this.department}`);
    return fibonacci(num);
  }
}



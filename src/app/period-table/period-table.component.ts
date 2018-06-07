import { Component, OnInit, Input } from '@angular/core';
import { DropData } from 'angular-draggable-droppable/droppable.directive';
import { Period } from '../models/period';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-period-table',
  templateUrl: './period-table.component.html',
  styleUrls: ['./period-table.component.scss']
})
export class PeriodTableComponent implements OnInit {
  @Input() period: Period;

  constructor() { }

  ngOnInit() {
  }

  onDrop(drop: DropData) {
    const materia: Materia = drop.dropData;
    materia.placed = true;
    this.period.push(materia);
  }
}

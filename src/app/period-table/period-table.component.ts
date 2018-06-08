import { Component, OnInit, Input } from '@angular/core';
import { DropData } from 'angular-draggable-droppable/droppable.directive';
import { Period, PeriodCollection } from '../models/period';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-period-table',
  templateUrl: './period-table.component.html',
  styleUrls: ['./period-table.component.scss']
})
export class PeriodTableComponent implements OnInit {
  @Input() period: Period;
  @Input() periodList: PeriodCollection;

  draggable: boolean = null;

  ngOnInit() {
  }

  onDrop(drop: DropData) {
    const materia: Materia = drop.dropData;

    if (materia.canDrop) {
      materia.event.next('placed');
      this.period.push(materia);
    }

    this.draggable = null;
  }

  onDragEnter(drop: DropData) {
    const materia: Materia = drop.dropData;
    materia.canDrop = this.periodList.checkRequired(materia, this.period);
    this.draggable = materia.canDrop;
  }

  onDragLeave(drop: DropData) {
    this.draggable = null;
  }

  onRemove(materia: Materia) {
    const index = this.period.indexOf(materia);
    this.period.splice(index, 1);

    materia.event.next('removed');
  }
}

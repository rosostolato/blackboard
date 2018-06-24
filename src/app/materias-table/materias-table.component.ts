import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MateriaCollection, Materia } from '../models/materia';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ValidateDrag } from 'angular-draggable-droppable/draggable.directive';

@Component({
  selector: 'app-materias-table',
  templateUrl: './materias-table.component.html',
  styleUrls: ['./materias-table.component.scss']
})
export class MateriasTableComponent implements OnInit {
  @Input() materiaList: MateriaCollection;
  periods: MateriaCollection[];

  @Output() dragStart: EventEmitter<any> = new EventEmitter();
  @Input() validateDrag: ValidateDrag;

  ngOnInit() {
    this.materiaList.forEach((mat, index, arr) => {
      mat.event.subscribe(event => {
        switch (event) {
          case 'placed':
          const i = arr.indexOf(mat);
          arr.splice(i, 1);
          break;

          case 'removed':
          arr.push(mat);
          // this.materiaList.sortById();
          break;
        }
      });
    });

    this.periods = this.materiaList.groupByPeriod();
  }

  trackBy(index: number) {
    return index;
  }

  parsePeriod(index: number, mat: Materia) {
    return index ?
      (mat.period !== this.materiaList[index - 1].period
        ? mat.period : null)
      : mat.period;
  }

  mouseEvent(event: string, tip: NgbTooltip, mat: Materia) {
    if (!mat.parents.length && !mat.children.length) {
      return;
    }

    if (event === 'over') {
      tip.open();
    }

    if (event === 'leave') {
      tip.close();
    }
  }
}

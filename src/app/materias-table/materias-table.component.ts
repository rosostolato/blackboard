import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MateriaCollection, Materia } from '../models/materia';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { DragStart } from 'angular-draggable-droppable/draggable.directive';

@Component({
  selector: 'app-materias-table',
  templateUrl: './materias-table.component.html',
  styleUrls: ['./materias-table.component.scss']
})
export class MateriasTableComponent implements OnInit {
  periods: MateriaCollection[];
  @Input() materiaList: MateriaCollection;
  @Output() dragStart: EventEmitter<DragStart> = new EventEmitter();

  private canDrag: boolean;
  private preventScroll: boolean;
  private timeout: NodeJS.Timer;

  constructor() {
    document.body.addEventListener('touchmove', (e: TouchEvent) => {
      if (this.preventScroll) {
        e.preventDefault();
      }
    }, {passive: false});

    document.body.addEventListener('touchend', (e: TouchEvent) => {
      this.preventScroll = false;
    });
  }

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

  onTouch($event: DragStart) {
    this.canDrag = screen.width > 500;

    this.timeout = setTimeout(() => {
      this.canDrag = true;
      this.preventScroll = true;
    }, 500);
  }

  validate(coordinates: Coordinates) {
    if (!this.canDrag) {
      clearTimeout(this.timeout);
      return false;
    }
    return true;
  }
}

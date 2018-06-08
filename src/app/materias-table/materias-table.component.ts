import { Component, OnInit, Input } from '@angular/core';
import { MateriaCollection, Materia } from '../models/materia';

@Component({
  selector: 'app-materias-table',
  templateUrl: './materias-table.component.html',
  styleUrls: ['./materias-table.component.scss']
})
export class MateriasTableComponent implements OnInit {
  @Input() materiaList: MateriaCollection;

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
          this.materiaList.sortById();
          break;
        }
      });
    });
  }

  parsePeriod(index: number, mat: Materia) {
    return index ?
      (mat.period !== this.materiaList[index - 1].period
        ? mat.period : null)
      : mat.period;
  }

  preHover(event: MouseEvent) {
    debugger;
  }
}

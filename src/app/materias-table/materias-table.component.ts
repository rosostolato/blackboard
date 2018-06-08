import { Component, OnInit, Input } from '@angular/core';
import { MateriaCollection } from '../models/materia';

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
          arr.splice(index, 1);
          break;

          case 'removed':
          arr.push(mat);
          break;
        }
      });
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { MateriaCollection } from '../models/materia';

@Component({
  selector: 'app-materias-table',
  templateUrl: './materias-table.component.html',
  styleUrls: ['./materias-table.component.scss']
})
export class MateriasTableComponent implements OnInit {
  @Input() materias: MateriaCollection;

  constructor() { }

  ngOnInit() {
  }

  onDragStart(index: number) {
    if (this.materias[index].placed) {
      this.materias.splice(index, 1);
    }
  }
}

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

  // Não funciona por que a função drop no outro component é chamada depois dessa
  onDragEnd(index: number) {
    // if (this.materias[index].placed) {
    //   this.materias.splice(index, 1);
    // }

    // deveria checar se realmente pode excluir
    // desse jeito ele exclui mesmo se vc soltar em qualquer lugar
    this.materias.splice(index, 1);

    // possível solução:
    // criar eventos a serem disparados e controlados pelo component app
    // assim esses components conversariam entre si
  }
}

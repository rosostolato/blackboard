import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';

import { MateriaCollection, IMateriaParsed } from './models/materia';
import { PeriodCollection } from './models/period';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  materias: MateriaCollection;
  periods: PeriodCollection;

  constructor (private papa: Papa) {}

  public onUpload(fileList: FileList) {
    const file = fileList[0];

    this.papa.parse(file, {
      header: true,
      delimiter: ';',
      encoding: 'ISO-8859-1',
      complete: this.onLoad.bind(this)
    });
  }

  private onLoad(results) {
    const objects: IMateriaParsed[] = results.data;
    this.materias = new MateriaCollection(objects);
    this.periods = new PeriodCollection(this.materias);
  }
}

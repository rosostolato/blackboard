import { Materia, MateriaCollection } from './materia';
import * as _ from 'lodash';

export class Period extends Array<Materia> {
  date: string;

  constructor () {
    super();

    Object.setPrototypeOf(this,
      _.extend(Period.prototype, Array.prototype));
  }
}

export class PeriodCollection extends Array<Period> {
  materias: MateriaCollection;

  constructor (materias: MateriaCollection, count?: number) {
    const arr = _
      .range(0, count || materias.periods)
      .map(i => new Period());
    super(...arr);

    Object.setPrototypeOf(this,
      _.extend(PeriodCollection.prototype, Array.prototype));

    this.materias = materias;
  }

  public checkRequired(materia: Materia, currentPeriod: Period): boolean {
    if (!materia.parents.length) {
      return true;
    }

    return materia.parents.every(mat => {
      return this.some(period => {
        if (true) { // period.date !== currentPeriod.date) {
          return period.indexOf(mat) > -1;
        }
      });
    });
  }
}

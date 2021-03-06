import * as _ from 'lodash';
import { Subject } from 'rxjs';

export interface IMateriaParsed {
  codigo: string;
  periodo: string;
  nome: string;
  req: string;
}

export class Materia {
  id: string;
  period: number;
  name: string;
  required: string[];

  // meta
  parents: Materia[] = [];
  children: Materia[] = [];

  // observable
  event = new Subject<string>();
  canDrop = false;

  constructor (obj: IMateriaParsed) {
    this.id = obj.codigo;
    this.name = obj.nome;
    this.period = parseInt(obj.periodo, null);

    const aux = obj.req
      .replace(/\s/g, '').split(',')
      .map(str => str ? `"${str}"` : str)
      .join(',');

    this.required = JSON.parse(`[${ aux }]`);
  }
}

export class MateriaCollection extends Array<Materia> {
  public periods: number;

  constructor (objArr?: Materia[] | IMateriaParsed[]) {
    super();

    Object.setPrototypeOf(this,
      _.extend(MateriaCollection.prototype, Array.prototype));

    if (Array.isArray(objArr)) {
      if (objArr[0] instanceof Materia) {
        this.push(...<Materia[]>objArr);
      } else {
        this.add(<IMateriaParsed[]>objArr);
      }
    }
  }

  public add(objArr: IMateriaParsed | IMateriaParsed[]) {
    if (Array.isArray(objArr)) {
      objArr.forEach(_push.bind(this));
    } else {
      _push.apply(this, objArr);
    }

    this.setParents();
    this.setInfo();

    function _push (obj: IMateriaParsed) {
      const materia = new Materia(obj);
      this.push(materia);
    }
  }

  private setParents() {
    this.forEach((materia, i, arr) => {
      arr.forEach(mat => {
        if (materia.required.some(r => mat.id === r)) {
          materia.parents.push(mat);
          mat.children.push(materia);
        }
      });
    });
  }

  private setInfo() {
    this.periods = this
      .reduce((a, b) => b.period > a.period ? b : a)
      .period;
  }

  // public sortById() {
  //   this.sort((a, b) => {
  //     if (a < b) { return -1; }
  //     if (a > b) { return 1; }
  //     return 0;
  //   });
  // }

  public toArray() {
    return new Array(...this);
  }

  public groupByPeriod() {
    return _(this.toArray())
      .groupBy(x => x.period)
      .map((materias, key) => {
        const buf = new MateriaCollection(materias);
        buf.periods = parseInt(key, null);
        return buf;
      })
      .valueOf();
  }
}

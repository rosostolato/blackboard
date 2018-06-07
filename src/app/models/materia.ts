import * as _ from 'lodash';

export interface IMateriaParsed {
  id: string;
  period: string;
  name: string;
  required: string;
}

export class Materia {
  id: number;
  period: number;
  name: string;
  required: number[];

  // meta
  parents: Materia[];
  children: Materia[];

  placed: boolean;

  constructor (obj: IMateriaParsed) {
    this.name = obj.name;
    this.id = parseInt(obj.id, null);
    this.period = parseInt(obj.period, null);
    this.required = JSON.parse(`[${obj.required}]`);

    this.parents = [];
    this.children = [];
    this.placed = false;
  }
}

export class MateriaCollection extends Array<Materia> {
  public periods: number;

  constructor (objArr?: IMateriaParsed[]) {
    super();

    Object.setPrototypeOf(this,
      _.extend(MateriaCollection.prototype, Array.prototype));

    if (Array.isArray(objArr)) {
      this.add(objArr);
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
}

import { Materia, MateriaCollection } from './materia';
import * as _ from 'lodash';

export class PeriodDate {
  year: number;
  semester: number;

  constructor (str: string) {
    const [year, semester] = str.split('.');
    this.year = parseInt(year, null);
    this.semester = parseInt(semester, null) - 1;
  }

  isSame(obj: PeriodDate) {
    return obj.year === this.year && obj.semester === this.semester;
  }

  addYear(count?: number) {
    count = count || 1;

    const year = this.year + count;
    const semester = this.semester;

    return new PeriodDate(this.toString(year, semester));
  }

  subYear(count?: number) {
    count = count || 1;

    const year = this.year - count;
    const semester = this.semester;

    return new PeriodDate(this.toString(year, semester));
  }

  addSemester(count?: number) {
    count = count || 1;
    count = this.semester + count;

    const year = this.year + Math.floor(count / 2);
    const semester = count % 2;

    return new PeriodDate(this.toString(year, semester));
  }

  subSemester(count?: number) {
    count = count || 1;
    count = 1 - this.semester + count;

    const year = this.year - Math.floor(count / 2);
    const semester = 1 - count % 2;

    return new PeriodDate(this.toString(year, semester));
  }

  toString(year?: number, semester?: number) {
    year = year || this.year;
    semester = semester === undefined ? this.semester : semester;

    return `${year}.${semester + 1}`;
  }
}

export class Period extends Array<Materia> {
  date: PeriodDate;

  constructor (lastPeriod?: Period) {
    let number = 0;

    if (_.isNumber(lastPeriod)) {
      number = lastPeriod;
    }

    super(number);

    if (number) {
      return;
    }

    Object.setPrototypeOf(this,
      _.extend(Period.prototype, Array.prototype));

    if (lastPeriod) {
      this.date = lastPeriod.date.addSemester();
    } else {
      this.date = new PeriodDate('2017.1');
    }
  }
}

export class PeriodCollection extends Array<Period> {
  constructor (count: number) {
    const arr: Period[] = [];
    _.range(0, count).forEach(i => {
      const period = new Period(i ? arr[i - 1] : null);
      arr.push(period);
    });

    super(...arr);

    Object.setPrototypeOf(this,
      _.extend(PeriodCollection.prototype, Array.prototype));
  }

  checkRequired(materia: Materia, currentPeriod: Period): boolean {
    if (!materia.parents.length) {
      return true;
    }

    return materia.parents.every(mat => {
      return this.some(period => {
        if (!period.date.isSame(currentPeriod.date)) {
          return period.indexOf(mat) > -1;
        }
      });
    });
  }

  addSemester(period: Period) {
    const index = this.indexOf(period);

    for (let i = index; i < this.length; i++) {
      this[i].date = this[i].date.addSemester();

      if (i < this.length - 1) {
        if (!this[i].date.isSame(this[i + 1].date)) {
          return;
        }
      }
    }
  }

  subSemester(period: Period) {
    const index = this.indexOf(period);

    for (let i = index; i >= 0; i--) {
      this[i].date = this[i].date.subSemester();

      if (i > 0) {
        if (!this[i].date.isSame(this[i - 1].date)) {
          return;
        }
      }
    }
  }
}

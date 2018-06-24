import { Component, OnInit, Input } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { MateriaCollection } from '../models/materia';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private obs: Observable<Event>;
  private sub: Subscription;
  private lastPos: number;
  private width: number;

  @Input() materiaList: MateriaCollection;

  constructor () {
    this.obs = fromEvent(document.body, 'touchmove');
    this.width = 20;
  }

  ngOnInit() {
  }

  onrelease() {
    this.sub.unsubscribe();

    if (this.width > screen.width / 3) {
      this.width = screen.width - 20;
    } else {
      this.width = 20;
    }
  }

  onclick(event: TouchEvent) {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }

    this.lastPos = event.touches[0].pageX;
    this.sub = this.obs.subscribe(this.touchMove.bind(this));
  }

  private touchMove(e: TouchEvent) {
    const touch = e.touches[0];
    this.width += this.lastPos - touch.pageX;
    this.lastPos = touch.pageX;

    this.width = Math.max(20, this.width);
    this.width = Math.min(screen.width - 20, this.width);
  }

  close() {
    this.width = 20;
  }

  getWidth() {
    return `${this.width}px`;
  }

  validateDrag(coord: Coordinates) {
    // TODO: validar depois de 3 segundos
    return true;
  }
}

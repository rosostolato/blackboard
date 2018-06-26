import { Component, OnInit, Input } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MateriaCollection } from '../models/materia';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private obs = fromEvent(document.body, 'touchmove');
  private sub: Subscription;

  private lastPos: number;
  private width = 25;

  isOpen = false;
  dragging = false;

  @Input() materiaList: MateriaCollection;

  ngOnInit() {
  }

  onclick(event: TouchEvent) {
    this.dragging = true;

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

  onrelease() {
    this.dragging = false;
    this.sub.unsubscribe();

    if (this.width > screen.width / 3) {
      this.width = screen.width - 20;
      this.isOpen = true;
    } else {
      this.width = 25;
      this.isOpen = false;
    }
  }

  close() {
    this.width = 25;
    this.isOpen = false;
  }

  getWidth() {
    return `${this.width}px`;
  }

  getRotation() {
    return `rotate(${180 * (this.width - 20) / (screen.width - 40)}deg)`;
  }

  validateDrag(coord: Coordinates) {
    // TODO: validar depois de 3 segundos
    return true;
  }
}

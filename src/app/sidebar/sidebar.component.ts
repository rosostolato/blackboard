import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() {
    document.addEventListener('drag', this.mousemove.bind(this));
  }

  ngOnInit() {
  }

  mousemove(event: MouseEvent) {
    const log = {
      x: event.clientX,
      y: event.clientY
    };

    console.log(log);
  }
}

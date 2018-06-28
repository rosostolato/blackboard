import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appClickEffect]'
})
export class ClickEffectDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    const el: HTMLElement = this.elementRef.nativeElement;
    const element = $(el.firstChild);

    element
      .css({ overflow: 'hidden' })
      .prepend('<span class="circle"></span>');

    const circle = element.find('.circle');

    circle.css({
      display: 'block',
      position: 'absolute',
      background: 'rgba(0,0,0,.075)',
      transform: 'scale(0)',
      'border-radius': '50%'
    });

    el.addEventListener('touchmove', function (e) {
      circle.css({ animation: 'none' });
    });

    el.addEventListener('touchstart', function (e) {
      circle.css({ animation: 'none' });

      if (!circle.height() && !circle.width()) {
        const d = Math.max(element.outerWidth(), element.outerHeight());
        circle.css({ height: d, width: d });
      }

      const x = e.touches[0].pageX - element.offset().left - circle.width() / 2;
      const y = e.touches[0].pageY - element.offset().top - circle.height() / 2;

      circle
        .css({ top: y + 'px', left: x + 'px' })
        .css({ animation: 'click-effect 1.0s linear' });
    });
  }
}

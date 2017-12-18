import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[appArrayPreprocess]'
})
export class ArrayPreprocessDirective {

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event']) onEvent($event) {
    const valueAsArray = this.el.nativeElement.value.split(',');
    this.control.control.setValue(valueAsArray);
  }

}

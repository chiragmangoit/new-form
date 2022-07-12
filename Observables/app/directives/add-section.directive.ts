import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddSection]'
})
export class AddSectionDirective implements OnInit{

  constructor( private renderer:Renderer2, private elf:ElementRef ) { }

  ngOnInit(): void {
    
    const div = this.renderer.createElement('div');
    const input = this.renderer.createElement('input');
    
    this.renderer.appendChild(div, [input]);
    this.renderer.appendChild(this.elf.nativeElement, div);

  }
}

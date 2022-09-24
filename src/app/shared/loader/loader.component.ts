import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
// width = height = radius , in px
  @Input() radius = 20;
// in rem
  @Input() borderWidth = 0.2;
  // if true adds an empty space after the loader , default is true
  @Input() addSpace = true;
  constructor() { }

  ngOnInit() {
  }

}

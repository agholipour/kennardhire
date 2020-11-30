import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'customised-panel',
  templateUrl: './customised-panel.component.html',
  styleUrls: ['./customised-panel.component.scss']
})
export class CustomisedPanelComponent implements OnInit {
 
  @Input()
  errorMessage$: Observable<string>;
  @Input()
  pageTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}


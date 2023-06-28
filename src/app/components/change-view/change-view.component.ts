import { Component, OnInit } from '@angular/core';
import { ViewStateService } from '../../services/state-service.service';

@Component({
  selector: 'app-change-view',
  templateUrl: './change-view.component.html',
  styleUrls: ['./change-view.component.css'],
})
export class ChangeViewComponent implements OnInit {
  token?: any;
  states: string[] = [
    'http://192.168.1.32:8080/documents/d/neoris/state1-1',
    'http://192.168.1.32:8080/documents/d/neoris/state2-1',
    'http://192.168.1.32:8080/documents/d/neoris/state3-1',
    'http://192.168.1.32:8080/documents/d/neoris/state4-1',
  ];
  selectedState?: number;

  constructor(private viewStateService: ViewStateService) { }

  ngOnInit() {
    this.viewStateService.state$.subscribe(state => {
      this.selectedState = state;
    });
  }

  selectState(state: number) {
    this.viewStateService.changeState(state);
  }
}

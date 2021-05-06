import { Component, OnInit } from '@angular/core';
import { HelperService } from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  text: string;
  result: string;

  constructor(private _helperService: HelperService) {
    this.result = '';
  }

  ngOnInit() {
  }

  translate() {
    if (this.text) {
      this.result += this._helperService.translateToPigLatin(this.text.split(' '));
      this.text = '';
    }
  }

  clearText() {
    this.result = '';
  }

}

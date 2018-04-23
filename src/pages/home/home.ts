import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {IMyDrpOptions,IMyDateRangeModel} from 'mydaterangepicker';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd/mm/yyyy',
        editableDateRangeField: false
    };


  constructor(public navCtrl: NavController) {

  }
  onDateRangeChanged(event: IMyDateRangeModel) {
       console.log(event);
   }
}

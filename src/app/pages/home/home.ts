import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import {IMyDrpOptions,IMyDateRangeModel} from 'mydaterangepicker';

import { EarthquakeData} from '../../services/usgs';
import { PeopleService } from "../../services/usgs.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myDateRangePickerOptions: IMyDrpOptions = {

        dateFormat: 'dd/mm/yyyy',
        editableDateRangeField: false

    };
  earthquake: EarthquakeData[] = [];
  errorMessage: string = '';
  startDate: any = '';
  endDate: any = '';
  searchparams: any = {
    beginDate:'',
    endDate:''
  };
  loading;

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController,
              private peopleService: PeopleService,
              private _loadingCtrl: LoadingController) {

  }

  showLoading() {
    if(!this.loading){
        this.loading = this._loadingCtrl.create({
            content: 'Please Wait...'
        });
        this.loading.present();
    }
}

dismissLoading(){
    if(this.loading){
        this.loading.dismiss();
        this.loading = null;
    }
}
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Fill up all the fields',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  searchData(){

            if(this.searchparams.beginDate.length){
              this.showLoading();
              this.peopleService
                .getEQData(this.searchparams)
                .subscribe(
                  result => {
                    this.dismissLoading();
                    console.log(result)
                  },
                  error => {
                    this.dismissLoading();
                    this.errorMessage = error;
                  },
                  () => {
                        this.dismissLoading();
                  }
                );
            }
            else{
              this.showAlert();
            }
  }



  onDateRangeChanged(event: IMyDateRangeModel) {

  if(event.formatted.length !== 0){
    this.searchparams.beginDate = event.beginDate.year+'-'+event.beginDate.month+'-'+event.beginDate.day;
    this.searchparams.endDate = event.endDate.year+'-'+event.endDate.month+'-'+event.endDate.day;
  }
  else{
    this.searchparams.beginDate = '';
    this.searchparams.endDate = '';
  }



  }

}

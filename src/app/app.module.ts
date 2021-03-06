import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapPage } from './pages/map/map';
import { HomePage } from './pages/home/home';
import { TabsPage } from './pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { HttpModule } from '@angular/http';

import { PeopleService } from './services/usgs.service';
@NgModule({
  declarations: [
    MyApp,
    MapPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    MyDateRangePickerModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    PeopleService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



import { EarthquakeData } from './usgs';

@Injectable()
export class PeopleService{
  private usgsUrl: string = 'http://localhost:8100/usgs';
  constructor(private http : Http){
  }

  getEQData(params: any = {}): Observable<EarthquakeData[]>{
    let eq$ = this.http
      .get(`${this.usgsUrl}/1/query`, { headers: this.getHeaders(),
        params:{
          format:'geojson',
          starttime: params.beginDate,
          endtime:  params.endDate,
          minlongitude: '116.631',
          maxlongitude: '127.266',
          minlatitude: '4.924',
          maxlatitude: '19.07'

        }
      })
      .map(mapEqDatas)
      .catch(handleError);
      return eq$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }


}

function mapEqDatas(response:Response): EarthquakeData[]{
  return response.json().features.map(toEarthquakeData);
}

function toEarthquakeData(r:any): EarthquakeData{
  let data = <EarthquakeData>({
  type: r.type,
    properties: {
      mag: r.properties.mag,
      place: r.properties.place,
      time: r.properties.time,
      updated: r.properties.updated,
      tz: r.properties.tz,
      url: r.properties.url,
      detail: r.properties.detail,
      felt: r.properties.felt,
      cdi: r.properties.cdi,
      mmi: r.properties.mmi,
      alert: r.properties.alert,
      status: r.properties.status,
      tsunami: r.properties.tsunami,
      sig: r.properties.sig,
      net: r.properties.net,
      code: r.properties.code,
      ids: r.properties.ids,
      sources: r.properties.sources,
      types: r.properties.types,
      nst: r.properties.nst,
      dmin: r.properties.dmin,
      rms: r.properties.rms,
      gap: r.properties.gap,
      magType: r.properties.magType,
      type: r.properties.type,
      title: r.properties.title
    },
    geometry: {
      type: r.geometry.type,
      coordinates: r.geometry.coordinates
    },
    id: r.id

  });
  //console.log('Parsed feature:', data);
  return data;
}


function handleError (error: any) {

  let errorMsg = error.message;
  console.error(errorMsg);

  return Observable.throw(errorMsg);
}

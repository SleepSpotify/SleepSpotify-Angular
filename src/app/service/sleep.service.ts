import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Sleep } from '../model/sleep'

@Injectable()
export class SleepService {
  private APIadress = 'http://localhost:8000/spotify/sleep';
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Accept': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers, withCredentials: true });
  }

  get(): Promise<Sleep> {
    return this.http
      .get(this.APIadress, this.options)
      .toPromise()
      .then(this.extractSleep)
      .catch(this.handleError);

  }

  post(uts: number): Promise<Sleep> {
    let body = new URLSearchParams();
    body.set('uts', Math.floor(uts/1000).toString())

    return this.http
      .post(this.APIadress, body, this.options)
      .toPromise()
      .then(this.extractSleep)
      .catch(this.handleError)
  }

  delete(): Promise<string> {
    return this.http
      .delete(this.APIadress, this.options)
      .toPromise()
      .then(res => {
        return res.json().Message
      }).catch(this.handleError)
  }

  private extractSleep(res: Response): Sleep {
    let body = res.json();
    if (body.Found === false) {
      return null
    }
    return new Sleep(body.Sleep.Uts*1000)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

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
      'Content-Type': 'application/json',
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
    return this.http
      .post(this.APIadress, { uts: uts }, this.options)
      .toPromise()
      .then(this.extractSleep)
      .catch(this.handleError)
  }

  delete(): Promise<any> {
    return this.http
      .delete(this.APIadress, this.options)
      .toPromise()
  }

  private extractSleep(res: Response): Sleep {
    let body = res.json();
    console.log(body);
    if (body.NbrItem === 0) {
      return null
    }
    let item = body.Data[0];
    return new Sleep(item.ID, item.Uts)
  }

  private handleError(error: any): Promise<Sleep> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

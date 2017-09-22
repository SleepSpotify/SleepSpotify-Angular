import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import 'rxjs/add/operator/toPromise';

import { JSONConnected } from '../model/return.api'

@Injectable()
export class AccountService {

  private APIadress = 'http://localhost:8000/account/isConnected';

  constructor(private http: Http){ }

  isConnected(): Promise<JSONConnected>{
    return this.http
      .get(this.APIadress, { withCredentials: true })
      .toPromise()
      .then(json => {
        return new JSONConnected(json.json());
      })
      .catch(json => {
        return Promise.reject(json.json().message)
      });
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

import 'rxjs/add/operator/toPromise';

import { Account } from '../model/account'

@Injectable()
export class AccountService {

  private APIadress = 'http://localhost:8000/account/isConnected';

  constructor(private http: Http){ }

  isConnected(): Promise<Account>{
    return this.http
      .get(this.APIadress, { withCredentials: true })
      .toPromise()
      .then(r => {
        return new Account(r.json());
      })
      .catch(r => {return false});
  }
}

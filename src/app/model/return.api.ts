import { Sleep } from './sleep'

export class JSONSleepFound {
  Found: boolean;
  Sleep: Sleep;

  constructor(json: any){
    this.Found = json.Found;
    this.Sleep = new Sleep(json.Sleep.Uts);
  }
}

export class JSONConnected {
  IsConnected: boolean;
  Username: string;

  constructor(json: any){
    this.IsConnected = json.IsConnected;
    this.Username = json.Username;
  }
}

export class JSONError {
  Message: string
  constructor(json: any) {
    this.Message = json.Message;
  }
}

export class JSONActionDone {
  Message: string;

  constructor(json: any){
    this.Message =json.Message;
  }
}

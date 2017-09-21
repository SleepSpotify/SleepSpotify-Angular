  export class Account {
    IsConnected: boolean;
    Username : string;

    constructor(r: any){
      this.Username = r.Username;
      this.IsConnected = r.IsConnected
    }
  }

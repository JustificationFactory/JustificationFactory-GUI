import {Injectable} from '@angular/core';

@Injectable()
export abstract class WsConnectorService {

  protected protocol: string;
  protected host: string;
  protected port: string;
  protected prepath: string;

  // TODO: handle errors on ws requests
  constructor() {
    this.protocol = 'http://';
    this.host = 'localhost';
    this.port = '9999';
    this.prepath = '/rest/argumentation/';
  }

  /* Assets */
  protected buildUrl(postpath): string {
    console.log('Path builded: ' + (this.protocol + this.host + ':' + this.port + this.prepath + postpath));
    return this.protocol + this.host + ':' + this.port + this.prepath + postpath;
  }

}

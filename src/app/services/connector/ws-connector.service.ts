import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WsConnectorService {

  public protocol: string;
  public host: string;
  public port: string;
  public prepath: string;
  private results: string[];


  constructor(private http: HttpClient) {
    this.protocol = 'http://';
    this.host = 'localhost';
    this.port = '9999';
    this.prepath = '/rest/argumentation/';
  }

  get<T>(path): Observable<T> {
    const url = this.buildUrl(path);
    console.log('Sending get request to: ' + url);
    return this.http.get<T>('http://localhost:9999/rest/argumentation/systems/');
  }

  post(path, object): Object {
    const url = this.buildUrl(path);
    this.http.post(url, object);

    return {'testReturn': 'validate'};
  }

  delete(path): Object {
    const url = this.buildUrl(path);
    this.http.delete(url);

    return {'yololo': 'wololo'};
  }

  /* Assets */
  buildUrl(postpath): string {
    return this.protocol + this.host + ':' + this.port + this.prepath + postpath;
  }

}

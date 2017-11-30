import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WsConnectorService} from './ws-connector.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class WsRetrieverService extends WsConnectorService {

  constructor(private http: HttpClient) {
    super();
  }

  public get<T>(path): Observable<T> {
    const url = this.buildUrl(path);
    console.log('Sending get request to: ' + url);
    return this.http.get<T>(url);
  }

}

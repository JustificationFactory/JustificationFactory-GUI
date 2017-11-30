import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WsConnectorService} from './ws-connector.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class WsRetrieverService extends WsConnectorService {

  constructor(private http: HttpClient) {
    super();
  }

  private get<T>(path): Observable<T> {
    const url = this.buildUrl(path);
    console.log('Sending get request to: ' + url);
    return this.http.get<T>(url);
  }

  /* Business */
  getAllArgumentationSystemsName(): Observable<string[]> {
    return this.get<string[]>('systems');
  }

  getArgumentationSystemByCurrentId(id: string): Observable<IArgSystem> {
    return this.get<IArgSystem>(id);
  }

  getPatternsByArgSystemId(argSystemId: string): Observable<string[]> {
    return this.get<string[]>(argSystemId + '/patterns');
  }

  getPatternByPatternId(argSystemId: string, patternId: string): Observable<IPattern> {
    return this.get<IPattern>(argSystemId + '/patterns/' + patternId);
  }

}

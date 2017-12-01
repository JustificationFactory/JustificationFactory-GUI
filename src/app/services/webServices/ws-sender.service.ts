import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WsConnectorService} from './ws-connector.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class WsSenderService extends WsConnectorService {

  constructor(private http: HttpClient) {
    super();
  }

  /* Features */
  private post<T>(path, payload): Observable<Object> {
    const url = this.buildUrl(path);
    console.log('Sending post request to: ' + url + ' with payload:');
    console.log(payload);
    return this.http.post<T>(url, payload, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  private httpDelete(path): Observable<Object> {
    const url = this.buildUrl(path);
    console.log('Sending delete request to: ' + url);
    return this.http.delete(path);
  }

  /* Business */

  /* DELETE */
  public removeArgumentationSystem(id: string): Observable<Object> {
    return this.httpDelete(id);
  }

  public removeStepsInArgumentationSystem(id: string): Observable<Object> {
    return this.httpDelete(id + '/pattern');
  }

  /* POST */
  public registerArgumentationSystem(argSystem: IArgSystem): Observable<Object> {
    return this.post<IArgSystem>('system', argSystem);
  }

  public registerPattern(argSystemId: string, pattern: IPattern): Observable<Object> {
    return this.post<IPattern>(argSystemId + '/pattern', pattern);
  }

  public constructStep(argSystemId: string, patternId: string, step: IStep): Observable<Object> {
    return this.post<IStep>(argSystemId + '/' + patternId + '/step', step);
  }

}

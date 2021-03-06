import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WsConnectorService} from './ws-connector.service';
import {HttpClient} from '@angular/common/http';
import {IArgSystem, IPattern} from '../../business/IArgSystem';


@Injectable()
export class WsRetrieverService extends WsConnectorService {

  constructor(private http: HttpClient) {
    super();
  }

  /* Features */
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
    return this.get<IArgSystem>('system/'+id);
  }

  getPatternsByArgSystemId(argSystemId: string): Observable<string[]> {
    return this.get<string[]>(argSystemId + '/patterns');
  }

  getPatternByPatternId(argSystemId: string, patternId: string): Observable<IPattern> {
    return this.get<IPattern>(argSystemId + '/patterns/' + patternId);
  }

  // TODO: verifywhen nexus axonic will be back alive
  // [support, conclusion, evidence, strategy, rationale, actor, ...]
  getArtifactTypes(type: string): Observable<string[]> {
    return this.get<any>('types/'+type);
  }

  /**
   * Retrieve the JSON schema for a specified class
   * @param {string} className a fully classified classname for which to retrieve its JSON schema
   */
  getTypeContent(className: string) {
    return this.get<any>('type?type=' + className);
  }

}

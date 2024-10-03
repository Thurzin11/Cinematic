import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IIngresso } from '../../model/IIngresso';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../environment';
import { IIngressoRegister } from '../../model/IIngressoRegister';

@Injectable({
  providedIn: 'root'
})
export class IngressoService {
  private http: HttpClient = inject(HttpClient);
  private ingressosSource = new BehaviorSubject<{acao: string, restart: boolean, ingresso?: IIngresso}>({acao: '', restart: false});
  ingressos$ = this.ingressosSource.asObservable();

  create(ingresso: IIngressoRegister): Observable<IIngresso> {
    return this.http.post<IIngresso>(`${Environment.urlApi}/ingresso`, ingresso);
  }

  findById(id: string): Observable<IIngresso> {
    return this.http.get<IIngresso>(`${Environment.urlApi}/ingresso/${id}`);
  }

  atualizarIngressos(acao: string, restart: boolean, ingresso?: IIngresso) {
    if(ingresso) {
      this.ingressosSource.next({acao, ingresso, restart});
      return;
    }

    this.ingressosSource.next({acao, restart})
  }
}

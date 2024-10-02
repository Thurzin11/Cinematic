import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IIngresso } from '../../model/IIngresso';

@Injectable({
  providedIn: 'root'
})
export class TransferirIngressosService {
  private ingressosSource = new BehaviorSubject<{acao: string, restart: boolean, ingresso?: IIngresso}>({acao: '', restart: false});
  ingressos$ = this.ingressosSource.asObservable();

  atualizarIngressos(acao: string, restart: boolean, ingresso?: IIngresso) {
    if(ingresso) {
      this.ingressosSource.next({acao, ingresso, restart});
      return;
    }

    this.ingressosSource.next({acao, restart})
  }
}

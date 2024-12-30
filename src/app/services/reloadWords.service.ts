import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReloadWordsService {
  private recargaSubject = new Subject<void>();

  getLoad() {
    return this.recargaSubject.asObservable();
  }

  loadEmitt() {
    this.recargaSubject.next();
  }
}

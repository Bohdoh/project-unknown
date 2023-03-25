import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private refresh = new Subject<void>();
  private refreshNavImage = new Subject<void>();

  refresh$ = this.refresh.asObservable();
  refreshNavImage$ = this.refreshNavImage.asObservable();

  triggerRefreshEvent() {
    this.refresh.next();
  }

  triggerNavImageRefresh(){
    this.refreshNavImage.next();
  }
}

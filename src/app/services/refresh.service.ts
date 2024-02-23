import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private isRefresh: boolean = false;

  constructor() {
    this.detectRefresh();
  }

  private detectRefresh() {
    if (performance.navigation.type === 1) {
      this.isRefresh = true;
    }
  }

  getIsRefresh(): boolean {
    return this.isRefresh;
  }
}

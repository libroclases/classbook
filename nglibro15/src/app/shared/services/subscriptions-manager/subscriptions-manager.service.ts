import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsManagerService implements OnDestroy{

  subscriptions: Map<string, Subscription>;

  constructor() {
    this.subscriptions = new Map();
  }

  registerSubscription(subscription: Subscription, name: string) {
    this.subscriptions.set(name, subscription)
  }

  unsubscribe(name: string) {
    let subs = this.subscriptions.get(name);
    if ( subs ) {
      subs.unsubscribe();
    }
  }

  unsubscribeAll() {
    for (let subs of this.subscriptions.values()) {
      subs.unsubscribe();
    }}

  ngOnDestroy() {
    this.unsubscribeAll();
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LoomNotification } from '../models/loom.notification.model';

@Injectable()
export class LoomNotificationsService {
    private notifications = new Subject<LoomNotification>();

    public noteAdded = this.notifications.asObservable();

    public add(notification: LoomNotification): void {
        this.notifications.next(notification);
    }

    public sendNotice(data): void{
        this.add( new LoomNotification( data.type, data.message, data.delay ) );
      }
}

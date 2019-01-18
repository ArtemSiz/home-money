import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BaseApi} from '../../../shared/core/base-api';
import {BJEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(event: BJEvent): Observable<BJEvent> {
        return this.post('events', event);
    }

    getEvents(): Observable<BJEvent[]> {
        return this.get('events');
    }

    getEventById(id: string): Observable<BJEvent> {
        return this.get(`events/${id}`);
    }
}

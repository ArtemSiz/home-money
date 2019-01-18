import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {mergeMap} from 'rxjs/internal/operators';

import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {BJEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs/index';

@Component({
    selector: 'bj-history-detail',
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

    event: BJEvent;
    category: Category;

    isLoaded = false;
    s1: Subscription;

    constructor(private route: ActivatedRoute,
                private eventsService: EventsService,
                private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.s1 = this.route.params
            .pipe(mergeMap((params: Params) => {
                return this.eventsService.getEventById(params['id']);
            }))
            .pipe(mergeMap((event: BJEvent) => {
                this.event = event;
                return this.categoriesService.getCategoryById(event.category);
            }))
            .subscribe((category: Category) => {
                this.category = category;
                this.isLoaded = true;
            });
    }

    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }

}

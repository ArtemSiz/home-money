import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, combineLatest} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {BJEvent} from '../shared/models/event.model';

@Component({
    selector: 'bj-planning-page',
    templateUrl: './planning-page.component.html',
    styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

    isLoaded = false;
    s1: Subscription;

    bill: Bill;
    categories: Category[] = [];
    events: BJEvent[] = [];

    constructor(private billService: BillService,
                private categoriesService: CategoriesService,
                private eventsService: EventsService) {
    }

    ngOnInit() {
        this.s1 = combineLatest(
            this.billService.getBill(),
            this.categoriesService.getCategories(),
            this.eventsService.getEvents()
        )
            .subscribe((data: [Bill, Category[], BJEvent[]]) => {
                this.bill = data[0];
                this.categories = data[1];
                this.events = data[2];

                this.isLoaded = true;
            });
    }

    getCategoryCost(cat: Category): number {
        const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
        return catEvents.reduce((total, e) => {
            total += e.amount;
            return total;
        }, 0);
    }

    private getPercent(cat: Category): number {
        const percent = (100 * this.getCategoryCost(cat) / cat.capacity);
        return percent > 100 ? 100 : percent;
    }

    getCatPercent(cat: Category): string {
        return this.getPercent(cat) + '%';
    }

    getCatColorClass(cat: Category): string {
        const percent = this.getPercent(cat);
        return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
    }

    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }

}

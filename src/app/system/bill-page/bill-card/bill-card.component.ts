import {Component, Input, OnInit} from '@angular/core';

import {Bill} from '../../shared/models/bill.model';

@Component({
    selector: 'bj-bill-card',
    templateUrl: './bill-card.component.html',
    styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

    @Input() bill: Bill;
    @Input() currency: any;

    dollar: number;
    euro: number;

    constructor() {
    }

    ngOnInit() {
        this.dollar = this.currency[0]['buy'] * this.bill.value;
        this.euro = this.currency[1]['buy'] * this.bill.value;
    }

}

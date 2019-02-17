import { Component, OnInit } from "@angular/core";
import { RestDataSource }   from "../service/rest.datasource";

@Component({
    moduleId: module.id,
    templateUrl: './amount.component.html',
    styleUrls: ['./amount.component.css']
})
export class AmountComponent implements OnInit{
    amount: Object = {};
    constructor(private dataSource: RestDataSource) {}
    ngOnInit(): void {
        this.dataSource.getAmount('photo')
            .subscribe(result => this.amount['photo'] = result.amount);
        this.dataSource.getAmount('music')
            .subscribe(result => this.amount['music'] = result.amount);
        this.dataSource.getAmount('video')
            .subscribe(result => this.amount['video'] = result.amount);
        this.dataSource.getAmount('story')
            .subscribe(result => this.amount['story'] = result.amount);
    }
}

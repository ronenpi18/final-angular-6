import { Observable } from "rxjs";
import { Input } from "@angular/core";

import { IStatisticsInstance } from "../models/data.model";

export class StatisticsBaseComponent {
    public type: string;
    public title: string;
    public icon: string;
    public closable: boolean;
    public changeable: boolean;
}

export class StatisticDynamicInput {
    // name must be data because dynamic component directives puts data here
    data$: Observable<IStatisticsInstance[]>
    @Input() set data(value: Observable<IStatisticsInstance[]>) {
        this.data$ = value;
    };
}

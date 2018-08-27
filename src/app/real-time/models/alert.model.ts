export interface IAlertInstance {
    numberOfInstances: string;
    timeRange: number;
    alertStatus: 'HIGH_FAILURE' | 'GENERIC';
    alertSevirity?: 'FAILURE' | 'WARNING';
    sevirityRank?: string;
    failersPercent?: string;
    alertHeader?: string;
    alertBody?: string;
}

export interface IAlertsReport {
    currentAlert: IAlertInstance[];
    earlierAlert: IAlertInstance[];
}
export interface IProcessInstance {
    fullId: string;
    name: string;
    status: string;
    latency: number;
    failures: string;
    successes: string;
}

export interface IFamilyInstance {
    fullId: string;
    name: string;
    status: string;
    alertsAmount: number;
    processes: IProcessInstance[];
}
export interface IProcessInstance {
    fullId: string;
    name: string;
    status: string;
    latency: number;
    failures: string;
    successes: string;
}

interface IBaseFamilyInstance {
    fullId: string;
    name: string;
    status: string;
    alertsAmount: number;
}

export interface IFamilyInstance extends IBaseFamilyInstance {
    fullId: string;
    name: string;
    status: string;
    alertsAmount: number;
    processes: IProcessInstance[];
}

export interface IEntityFamilyInstance extends IBaseFamilyInstance {
    processes: { [id: number]: IProcessInstance };
}
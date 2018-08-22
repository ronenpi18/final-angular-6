// TODO make generic for families and proccesses
export interface IStatisticsInstance {
    fullId?: string;
    traceId?: string;
    proccessKind?: string;
    sendVersion?: string;
    entityOperationalName?: string;
    startTime?: Date;
    endTime?: Date;
    timeStatus?: 'success' | 'alert' | 'error';
    processStatus?: 'finished';
    latency?: string;
    additionalFields?: {
        sendVersion?: string;
        entityOperationalName?: string;
    }
}
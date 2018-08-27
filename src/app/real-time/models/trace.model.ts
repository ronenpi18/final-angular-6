export interface ITrace {
    fullId: string;
    traceId: string;
    proccessKind: string;
    startTime: Date;
    endTime: Date;
    timeStatus: 'success' | 'alert' | 'error';
    processStatus: 'finished';
    latency: string;
    additionalFields: {
        sendVersion?: string;
        entityOperationalName?: string;
    }
}
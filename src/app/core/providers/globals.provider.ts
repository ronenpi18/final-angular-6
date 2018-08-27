import { Injectable } from '@angular/core';

const minute = 1000 * 60;

@Injectable({
    providedIn: 'root'
})
export class GlobalsProvider {
    hebrewDays: string[] = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"];
    
    // statisticsLiveRange = minute * 10
    updateStatisticsInterval = 5000;

    realTimeRange = minute * 10
    updateRealTimeAlertsInterval = 5000;
}
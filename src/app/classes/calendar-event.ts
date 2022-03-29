import { DateTime } from "luxon";

export class CalendarEvent {

    title!: string;
    startDate!: DateTime;
    endDate!: DateTime;
    color!: string;
    body!: string;

}

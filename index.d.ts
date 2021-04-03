export function useCalendar({ initialDate, initialNumDays, date: dateProp, numDays: numDaysProp, events, weekStartsOn, headers: headersProp, }?: {
    initialNumDays: number;
    events: any[];
    weekStartsOn: number;
    headers: string[];
}): {
    date: any;
    days: any;
    headers: any;
    view: string;
    numDays: any;
    jump: any;
    goToNext: any;
    goToPrev: any;
    goToToday: any;
    goToDate: any;
    getPrevButtonProps: any;
    getNextButtonProps: any;
    getTodayButtonProps: any;
    setNumDays: any;
};
export function Calendar(props: any): any;
export namespace Calendar {
    export { DEFAULTS as defaultProps };
    export { useCalendar };
    export { DAYS as days };
    export { VIEWS as views };
}
export default Calendar;
declare namespace DEFAULTS {
    export const initialNumDays: number;
    export const events: any[];
    import weekStartsOn = DAYS.SUNDAY;
    export { weekStartsOn };
    export { HEADERS as headers };
}
declare namespace DAYS {
    const SUNDAY: number;
    const MONDAY: number;
    const TUESDAY: number;
    const WEDNESDAY: number;
    const THURSDAY: number;
    const FRIDAY: number;
    const SATURDAY: number;
}
declare namespace VIEWS {
    const DAY: string;
    const WEEK: string;
    const MONTH: string;
    const YEAR: string;
}
declare const HEADERS: string[];

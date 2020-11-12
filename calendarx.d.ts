export = Calendarx;

declare function Calendarx(e: any): any;

declare namespace Calendarx {
    const days: {
        FRIDAY: number;
        MONDAY: number;
        SATURDAY: number;
        SUNDAY: number;
        THURSDAY: number;
        TUESDAY: number;
        WEDNESDAY: number;
    };

    const defaultProps: {
        events: any[];
        headers: string[];
        initialNumDays: number;
        weekStartsOn: number;
    };

    const views: {
        DAY: string;
        WEEK: string;
        MONTH: string;
        YEAR: string;
    };

    function useCalendar(e: any): any;

}


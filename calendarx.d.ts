import * as React from "react";

export type DateLike = Date | string | number

export interface Event {
    date: Date;
}

export type View = 'year' | 'month' | 'week' | 'day'

export type ButtonPropsGetter = () => { label: string, onClick: () => void }

export type Day = {
    date: Date,
    events: Event[],
    isToday: boolean,
    isSame: (view: View) => boolean
}

export type Properties = {
    date: Date,
    days: Day[][],
    headers: string[],
    view: View,
    numDays: number,
    jump: (n: number, v: View) => void,
    goToNext: () => void,
    goToPrev: () => void,
    goToToday: () => void,
    goToDate: (date: DateLike) => void,
    getPrevButtonProps: ButtonPropsGetter,
    getNextButtonProps: ButtonPropsGetter,
    getTodayButtonProps: ButtonPropsGetter,
    setNumDays: (numDays: number) => void
}

export interface Options {
    initialDate?: DateLike;
    initialNumDays?: number;
    date?: DateLike;
    numDays?: number,
    events?: Event[];
    weekStartsOn?: number;
    headers?: string[];
}

export type Props = Options & {
    children?: (properties: Properties) => React.ReactNode
}

export default Calendarx;

declare function Calendarx(props: Props): React.ReactNode;

declare namespace Calendarx {
    function useCalendar(options: Options): Properties;

    const days: {
        SUNDAY: number;
        MONDAY: number;
        TUESDAY: number;
        WEDNESDAY: number;
        THURSDAY: number;
        FRIDAY: number;
        SATURDAY: number;
    };

    const defaultProps: {
        events: Event[];
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
}


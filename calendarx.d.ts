import * as React from 'react';

export type DateLike = Date | string | number;

export type Event =
  | { date: DateLike }
  | { startDate: DateLike; endDate: DateLike };

export type View = 'year' | 'month' | 'week' | 'day';

export type ButtonPropsGetter = (props?: {
  onClick?: () => void;
}) => {
  role: string;
  'aria-label': string;
  onClick: () => void;
};

export type Day = {
  date: Date;
  events: Event[];
  isToday: boolean;
  isSame: (view: View) => boolean;
};

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type JumpUnit =
  | View
  | 'years'
  | 'y'
  | 'months'
  | 'M'
  | 'weeks'
  | 'w'
  | 'days'
  | 'd';

export type Properties = {
  date: Date;
  days: Day[][];
  headers: string[];
  view: View;
  numDays: number;
  jump: (n: number, v?: JumpUnit) => void;
  goToNext: (n?: number) => void;
  goToPrev: (n?: number) => void;
  goToToday: () => void;
  goToDate: (date: DateLike) => void;
  getPrevButtonProps: ButtonPropsGetter;
  getNextButtonProps: ButtonPropsGetter;
  getTodayButtonProps: ButtonPropsGetter;
  setNumDays: (numDays: number) => void;
};

export interface Options {
  initialDate?: DateLike;
  initialNumDays?: number;
  date?: DateLike;
  numDays?: number;
  events?: Event[];
  weekStartsOn?: Weekday;
  headers?: string[];
}

export interface Props extends Options {
  children: (properties: Properties) => React.ReactNode;
}

export default Calendarx;

declare function Calendarx(props: Props): React.ReactNode;

declare namespace Calendarx {
  function useCalendar(options?: Options): Properties;

  const days: {
    SUNDAY: 0;
    MONDAY: 1;
    TUESDAY: 2;
    WEDNESDAY: 3;
    THURSDAY: 4;
    FRIDAY: 5;
    SATURDAY: 6;
  };

  const defaultProps: {
    events: Event[];
    headers: string[];
    initialNumDays: number;
    weekStartsOn: Weekday;
  };

  const views: {
    DAY: 'day';
    WEEK: 'week';
    MONTH: 'month';
    YEAR: 'year';
  };
}

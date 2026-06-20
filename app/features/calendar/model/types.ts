export type Day = {
    weekday: string;
    day: number;
    active?: boolean;
};

export type Task = {
    title: string;
    meta: string;
    dayIndex: number;
    hour: number;
    duration: number;
    color: string;
};

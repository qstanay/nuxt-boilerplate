import type { Day, Task } from './types';

export const days: Day[] = [
    { weekday: 'Пн', day: 8, active: true },
    { weekday: 'Вт', day: 9 },
    { weekday: 'Ср', day: 10 },
    { weekday: 'Чт', day: 11 },
    { weekday: 'Пт', day: 12 },
    { weekday: 'Сб', day: 13 },
    { weekday: 'Вс', day: 14 },
];

export const hours = Array.from({ length: 9 }, (_, index) => 14 + index);

export const tasks: Task[] = [
    {
        title: 'Встреча рабочей группы DS...',
        meta: '14:30-15:30',
        dayIndex: 0,
        hour: 14.5,
        duration: 1,
        color: '#ffa62b',
    },
    {
        title: 'Проверить доску задач',
        meta: '17:00-17:30',
        dayIndex: 2,
        hour: 17,
        duration: 0.5,
        color: '#dd4b39',
    },
];

export const getTaskStyle = (task: Task) => ({
    gridColumn: `${task.dayIndex + 1}`,
    top: `${(task.hour - 14) * 72 + 36}px`,
    height: `${Math.max(task.duration * 72, 42)}px`,
    '--task-color': task.color,
});

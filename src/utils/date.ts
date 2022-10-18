import dayjs from 'dayjs';

export function getDaysDifference(day: number | string) {
    const days = Math.abs(dayjs(day).diff(Date.now(), 'day'));
    const hours = Math.abs(dayjs(day).diff(Date.now(), 'hour') % 24);
    const isExpired = dayjs(day).valueOf() - Date.now().valueOf() < 0;

    return `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'h ' : ''} ${
        isExpired ? 'ago' : 'left'
    }`;
}

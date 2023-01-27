import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(calendar)

export function useTimestamp(date, type) {
    if (!date) { return }

    const format = {
        lastDay: '[Yesterday]',
        lastWeek: 'dddd',
        sameElse: 'DD/MM/YYYY'
    }

    if (type == 'msg') {
        return dayjs(date).format('HH:mm')
    } else if (type == 'date') {
        return dayjs(date).calendar(null, {
            sameDay: 'HH:mm',
            ...format
        })
    } else if (type == 'divider') {
        return dayjs(date).calendar(null, {
            sameDay: '[Today]',
            ...format
        })
    } else {
        return undefined
    }
}

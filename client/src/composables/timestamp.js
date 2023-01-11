import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(calendar)

export function useTimestamp(type, date) {

    if (type == 'msg') {
        return dayjs(date).format('HH:mm')
    } else if (type == 'date') {
        return dayjs(date).calendar(null, {
            sameDay: 'HH:mm',
            lastDay: '[Yesterday]',
            lastWeek: 'dddd',
            sameElse: 'DD/MM/YYYY'
        })
    } else { return undefined }

}
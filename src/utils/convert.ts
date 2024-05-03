import moment from 'moment';

export function ConvertDate(date: Date): string {
    moment.locale('id')
    return moment(date).format('LL')
}
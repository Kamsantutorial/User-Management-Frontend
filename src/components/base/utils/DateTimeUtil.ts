import moment from 'moment'

export function dateTimeFormat(value: string, format: string) {
  if (!value)
    return value
  return moment(value).format(format)
}

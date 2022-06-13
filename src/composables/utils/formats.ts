import moment from 'moment'

export function useFormats() {
  return {
    moneyFormat(value: number, currency='L', decimalPlaces=2, applyProportion=false, thousandSeparator=',', decimalSeparator='.') {
      let proportion = ''
  
      if (applyProportion) {
        if (value >= 1000000) {
          value = value / 1000000;
          proportion = ' M'
        } else if (value >= 10000 && value < 1000000) {
          value = value / 1000
          proportion = ' k'
        }
      }
    
      let result = (value/1).toFixed(decimalPlaces).replace('.', decimalSeparator)
      const resultSplitted = result.split(decimalSeparator)

      // Regex to add thousandSeparator
      const regexToSetThousand = new RegExp(`\\B(?=(\\d{3})+(?!\\d))`, 'g')

      result = `${currency}\t${resultSplitted[0].replace(regexToSetThousand, thousandSeparator)}`
      result = `${result}${decimalSeparator}${resultSplitted[1]}${proportion}`

      return result
    },
    
    percentageFormat(value: number, decimalPlaces=2) {
      const val = (value*100).toFixed(decimalPlaces).replace(',', '.')
      return val + '%'
    },
    
    dateTimeFormat(value: string) {
      return moment(value).format('YYYY-MM-DD LT')
    }
  }
}
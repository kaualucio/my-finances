export function formatPriceValue(value: string) {
  let formatedValue = value
  if(value.search(',') > -1) {
    formatedValue = String(formatedValue).replace(',', '.')
  }
  return Number(formatedValue).toFixed(2)
}
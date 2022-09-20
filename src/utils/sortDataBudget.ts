const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export function sortDataBudget(data: any) {

  const sortedData = {
    incomes: [],
    spendings: []
  }
  let allIncomeByMonth = 0
  let allSpendingByMonth = 0

  months.map(month => {
    data.incomes.map((item, index) => {
      if(item.date === month) {
        allIncomeByMonth += item.value
      }
  
      if(data.incomes.length-1 === index) {
        sortedData.incomes.push(allIncomeByMonth)
      }
    }) 
  
    data.spendings.map((item, index) => {
      if(item.date === month) {
        allSpendingByMonth += item.value
      }
      if(data.spendings.length-1 === index) {
        sortedData.spendings.push(allSpendingByMonth)
      }
    }) 

    allIncomeByMonth = 0
    allSpendingByMonth = 0
  })

  return sortedData

}
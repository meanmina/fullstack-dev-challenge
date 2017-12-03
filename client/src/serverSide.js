
export default {

  requestPost: function(deposit, interest, months, monthlySavings, interestFrequency, currency) {
    var savings = []
    // total saved
    var savedAmount = deposit
    var monthlyInterestRate = parseFloat((interest/100)/12)
    for (var i = 1; i <= months; i++) {
      // add the monthly savings
      if (monthlySavings > 0)
        savedAmount = savedAmount + monthlySavings
      // work out interest
      var interestValue = 0
      if (i % interestFrequency === 0) {
        // we should add interest this month
        interestValue = savedAmount * monthlyInterestRate * interestFrequency
      }

      savedAmount = savedAmount + interestValue
      var earnings = parseFloat(savedAmount * currency).toFixed(4)
      savings.push({month: i, amount: earnings})
    }
    return {data:savings}
  }
}
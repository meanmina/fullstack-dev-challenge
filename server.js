const express = require('express');
var bodyParser = require('body-parser')

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
app.use(bodyParser.json());

app.post('/savings', (req, res) => {
  var response = getSavings(req.body.sDeposit,
                            req.body.sInterest,
                            req.body.sNumMonths,
                            req.body.sMonthlySavings,
                            req.body.sInterestFrequency,
                            req.body.sCurrency);
  res.setHeader('Content-Type', 'application/json');
  res.json(JSON.stringify(response));
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

function getSavings(deposit, interest, months, monthlySavings, interestFrequency, currency) {
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

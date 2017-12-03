import axios from "axios";

//Although the API might be returning relatively straightforward content,
//  please try and write the API code as if you were building something more complex.
//We would like to gain an idea of how you would go about structuring API code.

export default {
  requestCurrency: function(baseCurrency, currency) {
    const currencyExchangeURL = `https://api.fixer.io/latest?base=${baseCurrency}&symbols=${currency}`

    return axios.get(currencyExchangeURL)
      .then(response => {
        if (response.status !== 200) {
          console.log("Fixer returned with status " + response.status + " for request: " + currencyExchangeURL)
          return 1
        }

        return {
          data: response.data.rates[currency]
        };
      })
  }
}
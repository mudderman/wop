function convertTo24h(time) {
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/(am|pm)$/)[1];
  if (AMPM == "pm" && hours < 12) {
    hours = hours + 12;
  }
  if (AMPM == "am" && hours == 12) {
    hours = hours - 12;
  }
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) {
    sHours = "0" + sHours;
  }
  if (minutes < 10) {
    sMinutes = "0" + sMinutes;
  }
  return sHours + ":" + sMinutes;
}

var url = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.quotes where symbol IN ("' + message.suffix +'")&format=json&env=http://datatables.org/alltables.env';

var currencyMap = {
  "USD": "$",
  "GBP": "£"
};

function currency(c) {
  if (c in currencyMap) {
    return currencyMap[c];
  } else if (c !== 'SEK') {
      return ' ' + c;
    }
  return '';
}

unirest.get(url)
.headers({
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; MotoG3 Build/MPI24.107-55) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.81 Mobile Safari/537.36"
})
.end(function(result) {
    if (result.status == 200 && result.body.query.count == 1 && result.body.query.results.quote && result.body.query.results.quote.Ask != null) {
        var data = result.body.query.results.quote;

        var info = "Aktie: " + data.Symbol + ' / Kurs ' + data.LastTradePriceOnly + currency(data.Currency) + ' / Idag ' + data.Change + currency(data.Currency) + ' ' + data.ChangeinPercent;
        info += '\nHögsta: ' + data.DaysHigh + currency(data.Currency) + ' / Lägsta: ' + data.DaysLow + currency(data.Currency);
        info += '\nSenaste avslut: ' + convertTo24h(data.LastTradeTime);
        info += '\nhttp://finance.yahoo.com/quote/' + message.suffix;

        ch.sendMessage(info)
    } else {
        ch.sendMessage("Sorry, I can't find that stock symbol.");
    }
});
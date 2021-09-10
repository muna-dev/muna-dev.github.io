let btc= [], eth = [], times = [];

let chart = renderChart();

function getData() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum')
    .then(function (response) {
        return response.text();
    })
    .then(function (text) {
        csvToSeries(text);
        chart.update();
    })
    .catch(function (error) {
        //Something went wrong
        console.log(error);
    });

    setTimeout(getData, 2000);
}

function getTime() {
    return new Date().toLocaleTimeString('en-US', { hour12: false, 
        hour: "numeric", 
        minute: "numeric"});
}

function csvToSeries(text) {
    const dataAsJson = JSON.parse(text);

    const time = getTime();

    times.push(time);
    //btc.push(dataAsJson.BTC.EUR);
    eth.push(dataAsJson.current_price);
}

function renderChart() {
    var graph = new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: times,
          datasets: [{ 
              data: eth,
              label: "Ethereum",
              borderColor: "#8e5ea2",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Ethereum price in Euro',
            responsive: false
          }
        }
      });
    return graph;
}

function startup() {

}
getData();

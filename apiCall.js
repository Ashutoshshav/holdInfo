async function apiCall() {
        let response = await fetch("https://api.wazirx.com/api/v2/tickers");
        let result = await response.json();
        let resultArr = Object.entries(result);
        let topResult = resultArr.slice(0, 10);
        console.log(topResult);
}

module.exports = apiCall;
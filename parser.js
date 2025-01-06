const yahooFinance = require('yahoo-finance2').default; // NOTE the .default

const parser = async (code) => {
    const quote = await yahooFinance.quote(code);

    if(quote){
        let curPrice = quote['regularMarketPrice']
        let change = quote['regularMarketChange']
        let percentage = quote['regularMarketChangePercent']
        let name = quote['longName']
        let marketNotice = ''
    
        return {
            curPrice,
            change,
            percentage,
            name,
            marketNotice,
        };
    }

    return null;
};

module.exports = { parser };

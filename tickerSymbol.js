function rectifyTickerSymbol(tickerSymbol) {
    // Assumption:
    // 1-4 digit(s) -> HK
    // 6 digits, starts with 5/6 -> SS
    // 6 digits, starts with 0/1/3 -> SZ
    const tickerSymbolNumber = Number(tickerSymbol);

    if (Number.isNaN(tickerSymbolNumber)) {
        return tickerSymbol;
    }

    switch (tickerSymbol.length) {
        case 1:
        case 2:
        case 3:
        case 4: {
            const padded = `${tickerSymbolNumber}`.padStart(4, '0');

            return `${padded}.HK`;
        }
        case 6: {
            const [firstChar] = tickerSymbol;

            switch (firstChar) {
                case '0':
                case '1':
                case '3':
                    return `${tickerSymbol}.SZ`;
                case '5':
                case '6':
                    return `${tickerSymbol}.SS`;
            }
        }
    }

    return tickerSymbol;
}

module.exports = { rectifyTickerSymbol };
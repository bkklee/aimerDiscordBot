function isAlphabet(str) {
    return Boolean(str.match(/^[a-z]$/i));
}

function isNumeric(str) {
    return Boolean(str.match(/^[0-9]$/));
}

function rectifyTickerSymbol(tickerSymbol) {
    // Assumption:
    // 1-4 digit(s) -> HK
    // 6 digits, starts with 5/6 -> SS
    // 6 digits, starts with 0/1/3 -> SZ
    // Mix of digits / letters, no dot -> SI
    const tickerSymbolNumber = Number(tickerSymbol);

    if (Number.isNaN(tickerSymbolNumber)) {
        // Check if it's a mix
        if (!tickerSymbol.toUpperCase().endsWith('.SI')) {
            let hasAlphabet = false;
            let hasNumeric = false;
            let hasOthers = false;

            for (const char of tickerSymbol) {
                if (isAlphabet(char)) {
                    hasAlphabet = true;
                } else if (isNumeric(char)) {
                    hasNumeric = true;
                } else {
                    hasOthers = true;
                }
            }

            if (hasAlphabet && hasNumeric && !hasOthers) {
                return `${tickerSymbol}.SI`;
            }
        }

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

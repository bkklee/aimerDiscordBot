const nameToSymbolsMapping = {
    ':asia': [
        '^HSI',
        '000300.SS',
        '^TWII',
        '^N225',
        '^NSEI',
        '^STI',
        '^TASI.SR',
    ],
    ':europe': ['^FTSE', '^FCHI', '^GDAXI', 'OSEAX.OL'],
    ':us': ['^DJI', '^GSPC', '^IXIC', '^RUT', '^VIX'],
    ':bank': [
        '0005.HK',
        '1398.HK',
        'D05.SI',
        'ICICIBANK.NS',
        'BNP.PA',
        'DNB.OL',
        'BAC',
        'C',
    ],
    ':insurance': ['1299.HK', '2318.HK', 'ZURN.SW', 'CS.PA', 'BRK-B'],
    ':food': [
        '2319.HK',
        '3690.HK',
        '1216.TW',
        'CARL-B.CO',
        'NESN.SW',
        'KHC',
        'KO',
        'MCD',
    ],
    ':semi': ['8035.T', '2330.TW', '005930.KS', 'NVDA', 'MU', 'ARM', 'TXN'],
    ':alt': ['GC=F', 'SI=F', 'CL=F', 'BTC-USD', 'ETH-USD'],
};

const nameToTitleMapping = {
    ':asia': 'Asian stock market index',
    ':europe': 'European stock market indices',
    ':us': 'US stock market indices',
    ':bank': 'Major banks',
    ':insurance': 'Major insurance companies',
    ':food': 'Major food companies',
    ':semi': 'Major semiconductor companies',
    ':alt': 'Alternative assets',
};

module.exports = { nameToSymbolsMapping, nameToTitleMapping };

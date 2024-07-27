const { rectifyTickerSymbol } = require('../tickerSymbol');

describe('Ticker symbol functions', () => {
    test('rectify ticker symbol - can pad', () => {
        const rectified = rectifyTickerSymbol('5');

        expect(rectified).toBe('0005.HK');
    });

    test('rectify ticker symbol - can add suffix .HK', () => {
        const rectified = rectifyTickerSymbol('1299');

        expect(rectified).toBe('1299.HK');
    });

    test('rectify ticker symbol - can add suffix .SZ', () => {
        const rectified = rectifyTickerSymbol('000333');

        expect(rectified).toBe('000333.SZ');
    });

    test('rectify ticker symbol - can add suffix .SS', () => {
        const rectified = rectifyTickerSymbol('601398');

        expect(rectified).toBe('601398.SS');
    });

    test('rectify ticker symbol - can retain English', () => {
        const rectified = rectifyTickerSymbol('KO');

        expect(rectified).toBe('KO');
    });

    test('rectify ticker symbol - can retain other suffices', () => {
        const rectified = rectifyTickerSymbol('1328.T');

        expect(rectified).toBe('1328.T');
    });
});

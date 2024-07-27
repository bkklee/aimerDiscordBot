const { oneLineFormatter, detailedFormatter } = require('../formatter');

const info = {
    change: '+0.250',
    curPrice: '66.250',
    marketNotice: 'At close:  04:08PM HKT',
    name: 'HSBC Holdings plc (0005.HK)',
    percentage: 0.378378,
};

describe('Formatter', () => {
    test('detailed formatter', () => {
        const formatted = detailedFormatter(info);

        expect(formatted).toBe(
            `> HSBC Holdings plc (0005.HK)
> Price: **66.250**/+0.250\t(0.378%)
> At close:  04:08PM HKT
`,
        );
    });

    test('one-line formatter', () => {
        const formatted = oneLineFormatter(info);

        expect(formatted).toBe('HSBC Holdings plc (0005.HK) 66.250 0.378%');
    });
});

const HTMLParser = require('node-html-parser');

const parser = (body) => {
    const htmlfile = HTMLParser.parse(body);

    if (htmlfile.querySelector('#quote-header-info')) {
        const headerInfoFirstChild =
            htmlfile.querySelector('#quote-header-info').firstChild;
        const priceChild =
            headerInfoFirstChild.nextSibling.nextSibling.firstChild.firstChild
                .firstChild;
        let curPrice = priceChild.text;
        let change = priceChild.nextSibling.firstChild.text;
        let changeNum = parseFloat(change.replaceAll(',', ''));
        let curPriceNum = parseFloat(curPrice.replaceAll(',', ''));
        let percentage = (changeNum / (curPriceNum - changeNum)) * 100;
        let name =
            headerInfoFirstChild.nextSibling.firstChild.firstChild.firstChild
                .text;
        let marketNotice = htmlfile.querySelector('#quote-market-notice')
            .firstChild.text;

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

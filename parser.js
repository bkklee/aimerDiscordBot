const HTMLParser = require('node-html-parser');

const parser = (body) => {
    const htmlfile = HTMLParser.parse(body);

    if(htmlfile.querySelector('.js-quote-price-root')){
        let curPrice = htmlfile.querySelector('.js-quote-price-root').firstChild.firstChild.nextSibling.nextSibling.firstChild.text
        let change = htmlfile.querySelector('.js-quote-price-root').firstChild.firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.firstChild.text.replaceAll("Dollar change","")
        let changeNum = parseFloat(change.replaceAll(',', ''));
        let curPriceNum = parseFloat(curPrice.replaceAll(',', ''));
        let percentage = (changeNum / (curPriceNum - changeNum)) * 100;
        let name = "UPDATING";
        let marketNotice = "UPDATING";

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

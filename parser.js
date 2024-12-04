const HTMLParser = require('node-html-parser');

const parser = (body) => {
    const htmlfile = HTMLParser.parse(body);

    if(htmlfile.querySelector('.quote-price_wrapper_price')){
        let curPrice = htmlfile.querySelector('.quote-price_wrapper_price').text
        const rawChange = htmlfile.querySelector('.quote-price_wrapper_change').text.replaceAll("\r\n","\n").replaceAll("\n","").replaceAll(" ","")
        const change = rawChange.match(/Dollarchange([+-]?\d+(\.\d+)?)Percentagechange/)[1];
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

const detailedFormatter = ({
    name,
    curPrice,
    change,
    percentage,
    marketNotice,
}) => {
    let tmpReply = '';

    tmpReply += '> ' + name;
    tmpReply += '\n';
    tmpReply += `> Price: **${curPrice}**/${change}\t(${percentage.toPrecision(3)}%)`;
    tmpReply += '\n';
    tmpReply += '> ' + marketNotice;
    tmpReply += '\n';

    return tmpReply;
};

const oneLineFormatter = ({
    name,
    curPrice,
    change,
    percentage,
    marketNotice,
}) => {
    return `${name} ${curPrice} ${percentage.toPrecision(3)}%`;
};

module.exports = {
    oneLineFormatter,
    detailedFormatter,
};

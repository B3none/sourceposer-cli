module.exports = async (process) => {
    process.title = 'SourcePoser';

    const {
        checkForBrokenNode,
        checkForUnsupportedNode,
    } = require('../src/utils/unsupported.js');

    checkForBrokenNode();
    checkForUnsupportedNode();
}

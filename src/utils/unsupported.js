const semver = require('semver');
const supported = require('../../package.json').engines.node;
const knownBroken = '<6.2.0 || 9 <9.3.0';

const checkVersion = exports.checkVersion = version => {
    const versionNoPrerelease = version.replace(/-.*$/, '');

    return {
        version: versionNoPrerelease,
        broken: semver.satisfies(versionNoPrerelease, knownBroken),
        unsupported: !semver.satisfies(versionNoPrerelease, supported),
    };
}

exports.checkForBrokenNode = () => {
    const nodejs = checkVersion(process.version);

    if (nodejs.broken) {
        console.error('ERROR: SourcePoser is known not to run on Node.js ' + process.version);
        console.error("You'll need to upgrade to a newer Node.js version in order to use this");
        console.error('version of SourcePoser. You can find the latest version at https://nodejs.org/');
        process.exit(1);
    }
}

exports.checkForUnsupportedNode = () => {
    const nodejs = checkVersion(process.version);

    if (nodejs.unsupported) {
        console.warn('SourcePoser does not support Node.js ' + process.version)
        console.warn('You should probably upgrade to a newer version of node as we')
        console.warn("can't make any promises that SourcePoser will work with this version.")
        console.warn('You can find the latest version at https://nodejs.org/')
    }
}

function formatOutput({ stats = {}, singleRecord = true }) {
    const rootFormatter = singleRecord ? formatDeckOutput : formatOutput;

    return Object.keys(stats).reduce((formattedStats, deck) => {
        formattedStats[deck] = rootFormatter({ stats: stats[deck].M });

        return formattedStats;
    }, {});
}

function formatDeckOutput({ stats }) {
    return {
        result20: stats.result20.N,
        result02: stats.result02.N,
        result21: stats.result21.N,
        result12: stats.result12.N,
        result101: stats.result101.N,
        result011: stats.result011.N,
        result111: stats.result111.N,
        otherResult: stats.otherResult.N,
        totalMatches: stats.totalMatches.N,
        game1: formatGameOutput(stats.game1.M),
        game2: formatGameOutput(stats.game2.M),
        game3: formatGameOutput(stats.game3.M)
    };
}

function formatGameOutput(stats) {
    return {
        onThePlayWins: stats.onThePlayWins.N,
        onThePlayLosses: stats.onThePlayLosses.N,
        onThePlayDraws: stats.onThePlayDraws.N,
        onTheDrawWins: stats.onTheDrawWins.N,
        onTheDrawLosses: stats.onTheDrawLosses.N,
        onTheDrawDraws: stats.onTheDrawDraws.N
    };
}

module.exports = formatOutput;

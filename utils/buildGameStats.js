const { RESULTS } = require("./constants");

const EMPTY_GAME_RECORD = {
    onThePlayWins: { N: "0" },
    onThePlayLosses: { N: "0" },
    onThePlayDraws: { N: "0" },
    onTheDrawWins: { N: "0" },
    onTheDrawLosses: { N: "0" },
    onTheDrawDraws: { N: "0" }
};

function gameResult(desiredResult, result) {
    if (result === desiredResult) {
        return 1;
    }

    if (desiredResult === RESULTS.DRAW && (result === RESULTS.INTENTIONAL_DRAW || result === RESULTS.UNINTENTIONAL_DRAW)) {
        return 1;
    }

    return 0;
}

function buildGameStats({ existingGameRecord = EMPTY_GAME_RECORD, onThePlay, result }) {
    if (!result) {
        return existingGameRecord;
    }

    const gameRecord = {
        onThePlayWins: onThePlay ? gameResult(RESULTS.WIN, result) : 0,
        onThePlayLosses: onThePlay ? gameResult(RESULTS.LOSS, result) : 0,
        onThePlayDraws: onThePlay ? gameResult(RESULTS.DRAW, result) : 0,
        onTheDrawWins: onThePlay ?  0 : gameResult(RESULTS.WIN, result),
        onTheDrawLosses: onThePlay ? 0 : gameResult(RESULTS.LOSS, result),
        onTheDrawDraws: onThePlay ? 0 : gameResult(RESULTS.DRAW, result),
    };

    return {
        onThePlayWins: { N: `${ parseInt(existingGameRecord.onThePlayWins.N) + gameRecord.onThePlayWins }` },
        onThePlayLosses: { N: `${ parseInt(existingGameRecord.onThePlayLosses.N) + gameRecord.onThePlayLosses }` },
        onThePlayDraws: { N: `${ parseInt(existingGameRecord.onThePlayDraws.N) + gameRecord.onThePlayDraws }` },
        onTheDrawWins: { N: `${ parseInt(existingGameRecord.onTheDrawWins.N) + gameRecord.onTheDrawWins }` },
        onTheDrawLosses: { N: `${ parseInt(existingGameRecord.onTheDrawLosses.N) + gameRecord.onTheDrawLosses }` },
        onTheDrawDraws: { N: `${ parseInt(existingGameRecord.onTheDrawDraws.N) + gameRecord.onTheDrawDraws }` }
    };
}

module.exports = buildGameStats;

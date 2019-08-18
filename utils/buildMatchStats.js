const { RESULTS } = require("./constants");
const buildGameStats = require("./buildGameStats");

const EMPTY_MATCH_RECORD = {
    game1: { M: undefined },
    game2: { M: undefined },
    game3: { M: undefined },
    result20: { N: "0" },
    result21: { N: "0" },
    result02: { N: "0" },
    result12: { N: "0" },
    result101: { N: "0" },
    result011: { N: "0" },
    result111: { N: "0" },
    otherResult: { N: "0" },
    totalMatches: { N: "0" }
};

const NO_GAME = {
    onThePlay: null,
    result: null
};

function matchResult(existingMatchRecord, game1Result, game2Result, game3Result) {
    // won 2-0
    if (game1Result === RESULTS.WIN && game2Result === RESULTS.WIN) {
        return {
            result20: { N: `${ parseInt(existingMatchRecord.result20.N) + 1 }` },
            result21: existingMatchRecord.result21,
            result02: existingMatchRecord.result02,
            result12: existingMatchRecord.result12,
            result101: existingMatchRecord.result101,
            result011: existingMatchRecord.result011,
            result111: existingMatchRecord.result111,
            otherResult: existingMatchRecord.otherResult
        };
    }

    // won 2-1
    if (game1Result === RESULTS.WIN && game2Result === RESULTS.LOSS && game3Result === RESULTS.WIN
        || game1Result === RESULTS.LOSS && game2Result === RESULTS.WIN && game3Result === RESULTS.WIN) {
        return {
            result20: existingMatchRecord.result20,
            result21: { N: `${ parseInt(existingMatchRecord.result21.N) + 1 }` },
            result02: existingMatchRecord.result02,
            result12: existingMatchRecord.result12,
            result101: existingMatchRecord.result101,
            result011: existingMatchRecord.result011,
            result111: existingMatchRecord.result111,
            otherResult: existingMatchRecord.otherResult
        };
    }

    // won 1-0-1
    if (game1Result === RESULTS.WIN && (game2Result === RESULTS.UNINTENTIONAL_DRAW || game2Result === RESULTS.INTENTIONAL_DRAW)) {
        return {
            result20: existingMatchRecord.result20,
            result21: existingMatchRecord.result21,
            result02: existingMatchRecord.result02,
            result12: existingMatchRecord.result12,
            result101: { N: `${ parseInt(existingMatchRecord.result101.N) + 1 }` },
            result011: existingMatchRecord.result011,
            result111: existingMatchRecord.result111,
            otherResult: existingMatchRecord.otherResult
        };
    }

    // lost 0-2
    if (game1Result === RESULTS.LOSS && game2Result === RESULTS.LOSS) {
        return {
            result20: existingMatchRecord.result20,
            result21: existingMatchRecord.result21,
            result02: { N: `${ parseInt(existingMatchRecord.result02.N) + 1 }` },
            result12: existingMatchRecord.result12,
            result101: existingMatchRecord.result101,
            result011: existingMatchRecord.result011,
            result111: existingMatchRecord.result111,
            otherResult: existingMatchRecord.otherResult
        };
    }

    // lost 1-2
    if (game1Result === RESULTS.WIN && game2Result === RESULTS.LOSS && game3Result === RESULTS.LOSS
        || game1Result === RESULTS.LOSS && game2Result === RESULTS.WIN && game3Result === RESULTS.LOSS) {
        return {
            result20: existingMatchRecord.result20,
            result21: existingMatchRecord.result21,
            result02: existingMatchRecord.result02,
            result12: { N: `${ parseInt(existingMatchRecord.result12.N) + 1 }` },
            result101: existingMatchRecord.result101,
            result011: existingMatchRecord.result011,
            result111: existingMatchRecord.result111,
            otherResult: existingMatchRecord.otherResult
        };
    }

    // lost 0-1-1
    if (game1Result === RESULTS.LOSS && (game2Result === RESULTS.UNINTENTIONAL_DRAW || game3Result === RESULTS.INTENTIONAL_DRAW)) {
        return {
            result20: existingMatchRecord.result20,
            result21: existingMatchRecord.result21,
            result02: existingMatchRecord.result02,
            result12: existingMatchRecord.result12,
            result101: existingMatchRecord.result101,
            result011: { N: `${ parseInt(existingMatchRecord.result011.N) + 1 }` },
            result111: existingMatchRecord.result111,
            otherResult: existingMatchRecord.otherResult
        };
    }

    // drew 1-1-1
    if (game1Result === RESULTS.WIN && game2Result === RESULTS.LOSS && (game3Result === RESULTS.UNINTENTIONAL_DRAW || game3Result === RESULTS.INTENTIONAL_DRAW)
        || game1Result === RESULTS.LOSS && game2Result === RESULTS.WIN && (game3Result === RESULTS.UNINTENTIONAL_DRAW || game3Result === RESULTS.INTENTIONAL_DRAW)) {
        return {
            result20: existingMatchRecord.result20,
            result21: existingMatchRecord.result21,
            result02: existingMatchRecord.result02,
            result12: existingMatchRecord.result12,
            result101: existingMatchRecord.result101,
            result011: existingMatchRecord.result011,
            result111: { N: `${ parseInt(existingMatchRecord.result111.N) + 1 }` },
            otherResult: existingMatchRecord.otherResult
        };
    }

    return {
        result20: existingMatchRecord.result20,
        result21: existingMatchRecord.result21,
        result02: existingMatchRecord.result02,
        result12: existingMatchRecord.result12,
        result101: existingMatchRecord.result101,
        result011: existingMatchRecord.result011,
        result111: existingMatchRecord.result111,
        otherResult: { N: `${ parseInt(existingMatchRecord.otherResult.N) + 1 }` },
    };
}

function buildMatchStats({
    existingMatchRecord = EMPTY_MATCH_RECORD,
    game1 = NO_GAME,
    game2 = NO_GAME,
    game3 = NO_GAME
}) {
    const matchRecords = matchResult(existingMatchRecord, game1.result, game2.result, game3.result);

    return {
        game1: { M: buildGameStats({
            existingGameRecord: existingMatchRecord.game1.M,
            onThePlay: game1.onThePlay,
            result: game1.result
        }) },
        game2: { M: buildGameStats({
            existingGameRecord: existingMatchRecord.game2.M,
            onThePlay: game2.onThePlay,
            result: game2.result
        }) },
        game3: { M: buildGameStats({
            existingGameRecord: existingMatchRecord.game3.M,
            onThePlay: game3.onThePlay,
            result: game3.result
        }) },
        result20: matchRecords.result20,
        result21: matchRecords.result21,
        result101: matchRecords.result101,
        result02: matchRecords.result02,
        result12: matchRecords.result12,
        result011: matchRecords.result011,
        result111: matchRecords.result111,
        otherResult: matchRecords.otherResult,
        totalMatches: { N: `${ parseInt(existingMatchRecord.totalMatches.N) + 1 }` }
    };
}

module.exports = buildMatchStats;

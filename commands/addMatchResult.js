const aggregateStatsDB = require("../db/aggregateStatsDB");
const matchesDB = require("../db/matchesDB");
const buildStats = require("../utils/buildStats");
const buildMatchRecord = require("../utils/buildMatchRecord");
const formatOutput = require("../utils/formatOutput");

async function addMatchResult(match) {
    const { dciNumber, deckName, opponentDeckName, games } = match;
    const datestamp = new Date().toISOString().split('T')[0];

    try {
        const existingRecord = await aggregateStatsDB.queryItem(dciNumber, deckName);

        const formattedResult = buildStats({
            existingRecord: existingRecord ? existingRecord.records.M : undefined,
            deckName: opponentDeckName,
            gameResults: games
        });

        await aggregateStatsDB.insertItem(dciNumber, deckName, formattedResult);
        await matchesDB.insertMatch(dciNumber, datestamp, buildMatchRecord(match));

        return {
            success: true,
            stats: formatOutput({ stats: formattedResult })
        };
    } catch (error) {
        console.log("addMatchResult Error", error);

        throw error;
    }
}

module.exports = addMatchResult;

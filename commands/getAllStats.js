const aggregateStatsDB = require("../utils/aggregateStatsDB");
const formatOutput = require("../utils/formatOutput");

async function getAllStats({ dciNumber }) {
    try {
        const statsArray = await aggregateStatsDB.queryItems(dciNumber);

        if (!statsArray || statsArray.length === 0) {
            return { success: true, stats: {} };
        }

        const statsObject = statsArray.reduce((statsOutput, { deck, records }) => {
            statsOutput[deck.S] = records;

            return statsOutput;
        }, {});

        return {
            success: true,
            stats: formatOutput({ stats: statsObject, singleRecord: false })
        };
    } catch (error) {
        console.log("getAllStats Error", error);

        throw error;
    }
}

module.exports = getAllStats;

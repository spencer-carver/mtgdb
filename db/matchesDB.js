const db = require("./db");

const DATABASE = {
    tableName: "mtgMatches",
    partitionKey: "dciNumber",
    sortKey: "datestamp",
    value: "matches"
};

function generateParams(dciNumber, datestamp, matches) {
    const QUERY_TYPE = matches ? "Item" : "Key";

    const params = {
        [QUERY_TYPE]: {
            [DATABASE.partitionKey]: { N: `${ dciNumber }` },
            [DATABASE.sortKey]: { S: datestamp }
        },
        TableName: DATABASE.tableName
    };

    if (matches) {
        params[QUERY_TYPE][DATABASE.value] = { L: matches };
    }

    return params;
}

async function insertMatch(dciNumber, datestamp, matchResult) {
    let record = await db.queryItem(generateParams(dciNumber, datestamp));

    if (!record) {
        record = { matches: { L: [] } };
    }

    record.matches.L.push(matchResult);

    return db.insertItem(generateParams(dciNumber, datestamp, record.matches.L));
}

async function queryPlayerOnDate(dciNumber, datestamp) {
    return db.queryItem(generateParams(dciNumber, datestamp));
}

async function queryPlayer(dciNumber) {
    const params = {
        ExpressionAttributeValues: {
            ":partitionkeyval": { N: `${ dciNumber }` }
        },
        KeyConditionExpression: "dciNumber = :partitionkeyval",
        TableName: DATABASE.tableName
    };

    return db.queryItems(params);
}

async function deletePlayerMatchesOnDate(dciNumber, datestamp) {
    return db.deleteItem(generateParams(dciNumber, datestamp));
}

module.exports = {
    insertMatch,
    queryPlayerOnDate,
    queryPlayer,
    deletePlayerMatchesOnDate
};

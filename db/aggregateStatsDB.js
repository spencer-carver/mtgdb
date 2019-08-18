const db = require("./db");

const DATABASE = {
    tableName: "mtgAggregate",
    partitionKey: "dciNumber",
    sortKey: "deck",
    value: "records"
};

function generateParams(dciNumber, deckName, record) {
    const QUERY_TYPE = record ? "Item" : "Key";

    const params = {
        [QUERY_TYPE]: {
            [DATABASE.partitionKey]: { N: `${ dciNumber }` },
            [DATABASE.sortKey]: { S: deckName }
        },
        TableName: DATABASE.tableName
    };

    if (record) {
        params[QUERY_TYPE][DATABASE.value] = { M: record };
    }

    return params;
}

async function insertItem(dciNumber, deckName, record) {
    return db.insertItem(generateParams(dciNumber, deckName, record));
}

async function queryItem(dciNumber, deckName) {
    return db.queryItem(generateParams(dciNumber, deckName));
}

async function queryItems(dciNumber) {
    const params = {
        ExpressionAttributeValues: {
            ":partitionkeyval": { N: `${ dciNumber }` }
        },
        KeyConditionExpression: "dciNumber = :partitionkeyval",
        TableName: DATABASE.tableName
    };

    return db.queryItems(params);
}

// function updateItem() { }

async function deleteItem(dciNumber, deckName) {
    return db.deleteItem(generateParams(dciNumber, deckName));
}

module.exports = {
    insertItem,
    queryItem,
    queryItems,
    /* updateItem, */
    deleteItem
};

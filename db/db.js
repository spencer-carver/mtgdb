const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB();

async function insertItem(params) {
    console.log("inserting item", JSON.stringify(params));
    return new Promise(function(resolve, reject) {
        dynamo.putItem(params, function (err, data) {
            if (err) {
                return reject(err);
            }
    
            return resolve(data.Item);
        });
    });
}

async function queryItem(params) {
    return new Promise(function(resolve, reject) {
        dynamo.getItem(params, function (err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Item);
        });
    });
}

async function queryItems(params) {
    return new Promise(function(resolve, reject) {
        dynamo.query(params, function(err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Items);
        });
    });
}

// function updateItem() { }

async function deleteItem(params) {
    return new Promise(function(resolve, reject) {
        dynamo.deleteItem(params, function (err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Item);
        });
    });
}

module.exports = {
    insertItem,
    queryItem,
    queryItems,
    /* updateItem, */
    deleteItem
};

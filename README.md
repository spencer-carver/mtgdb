## MTGdb

lambda function providing wrapper APIs for adding and retrieving metadata related to tournament magic results.

I've decided to implement this using DynamoDB rather than a relational database as the majority of use cases will be involving aggregate data, or retrieving the most recent matches, and not performing joins or queries.

Models for aggregate data will be available in this readme at a later date.

## Latest Updates

# v0.1.0 - 2019-08-11

* created wrappers for aggregateStats db interface, integrated with API gateway
* finalizing designs for match history / events (next update)

# v0.0.1 - 2019-08-06

* created repo, aggregate table planned.
* still designing recent / events table.

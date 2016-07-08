---
title: "Introduction"
slug: "introduction"
date: "2016-05-13T20:22:33-08:00"
product: "KeyValueAPI"
version: "v0.5.8"
type: "key-value-api-v0.5.8"
docurl: "/docs/key-value-api/v0.5.8/"
weight: 50
docsection: "Introduction"
draft: false

---


DynomiteDB provides a Redis-compatible key/value API that supports a variety of data types. DynomiteDB's API is Redis-compatible which means that you can use any Redis client to connect to DynomiteDB.

## Clients

DynomiteDB supports the Redis protocol and the majority of Redis commands. You can use any Redis to connect to DynomiteDB. Java developers should use the Dyno client which adds valuable features to the default Redis client.

- Java: <a href="https://github.com/Netflix/dyno" target="_blank">Dyno</a>
- Go: <a href="https://github.com/garyburd/redigo" target="_blank">Redigo</a>, <a href="https://github.com/mediocregopher/radix.v2" target="_blank">Radix</a>
- Node.js <a href="https://github.com/NodeRedis/node_redis" target="_blank">node_redis</a>
- Python: <a href="https://github.com/andymccurdy/redis-py" target="_blank">redis-py</a>
- <a href="http://redis.io/clients" target="_blank">Other languages</a>

## Key/value database

DynomiteDB allows you to query all supported backends via the same key/value API. This means that you can use the same data model and queries to access both a persistent storage and in-memory storage. 

### Data types

DynomiteDB supports a variety of data types, which are described below.

- [String](../string)
- [Integer](../integer)
- [Float](../float)
- [List](../list)
- [Set](../set)
- [Sorted Set](../sorted-set)
- [Hash](../hash)

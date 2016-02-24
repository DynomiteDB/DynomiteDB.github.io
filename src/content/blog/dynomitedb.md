---
title: "What is DynomiteDB?"
description: "A modern, modular NoSQL distributed database"
date: "2016-02-07T08:08:08-08:00"
draft: false
author: "Akbar S. Ahmed"
authors:
  - "Akbar S. Ahmed"
email: "akbar501@gmail.com"
categories:
  - "DynomiteDB"
tags:
  - "DynomiteDB"

---

DynomiteDB is a high performance, linearly scalable, highly available (HA) and distributed database. Dynomite's clustering has a Dynamo-inspired shared nothing architecture with no single point of failure (SPOF). High speed storage is provided by Redis while the clustering layer allows Redis to span 10s, 100s or 1000s of servers.

<!--more-->

DynomiteDB has a modular architecture that supports pluggable backends. Support for pluggable backends means that you can use the Dynomite clustering layer with different backends to support a variety of use cases.

For example, you can combine Dynomite with Redis to use DynomiteDB as a big data cache. 

Alternatively, you can setup another cluster that combines Dynomite with RocksDB as a big data database.

The two solutions described above reuse the same Dynomite layer to support vastly different use cases. With Redis, you gain exceptionally fast in-memory performance. With RocksDB, you gain strong persistent performance combined with minimal write amplification (which is ideal when you need to store massive amounts of data).

The fact that you can use DynomiteDB for both your cache and persistent database means that your operations staff can reuse tooling and knowledge for both solutions.

Also, DynomiteDB helps improve developer velocity by abstracting away sharding, replication and other distributed systems concepts. Developers can focus on application requirements by using a simple, Redis-compatible API to access DynomiteDB.

The current version of DynomiteDB combines three upstream projects into a comprehensive solution:

- **Dynomite**: A high performance Dynamo layer that adds linearly scalability, data replication, sharding, and high availability to Redis.
- **Redis**: The primary data store used by Dynomite to store cached data.
- **Dyno**: A Java client that communicates with Dynomite using the Redis protocol.

You can view each of the above projects on GitHub:

- <a href="https://github.com/Netflix/dynomite" target="_blank">Dynomite</a>
- <a href="https://github.com/Netflix/dyno" target="_blank">Dyno</a>
- <a href="https://github.com/antirez/redis" target="_blank">Redis</a>

## DynomiteDB vs. Dynomite

DynomiteDB uses Dynomite, Dyno and Redis as upstream projects. It combines these three projects into a single, easily installable package.

Dynomite is a generic Dynamo implementation that supports multiple key/value stores on the backend. It is unopinionated about which backend you use, Redis or Memcached. Therefore, an installation of Dynomite requires more configuration of both Dynomite plus Redis or Memcached.

DynomiteDB on the other hand is opinionated in its use of Redis as the backend for Dynomite. Dynomite installs and configures Dynomite to work with Redis out of the box as a big data cache.

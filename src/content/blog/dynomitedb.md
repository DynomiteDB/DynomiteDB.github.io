---
title: "What is DynomiteDB?"
description: "A high-performance distributed cache"
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

DynomiteDB is a high performance, linearly scalable, highly available (HA) and distributed cache. Dynomite's clustering has a Dynamo-inspired shared nothing architecture with no single point of failure (SPOF). High speed storage is provided by Redis while the clustering layer allows Redis to span 10s, 100s or 1000s of servers.

<!--more-->

DynomiteDB combines three upstream projects into a comprehensive solution:

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

DynomiteDB on the other hand is opinionated in its use of Redis as the backend for Dynomite. Dynomite installs and configures Dynomite to work with Redis out of the box.

---
title: "Why DynomiteDB"
date: "2016-02-16T08:08:08-08:00"
draft: true

---

1. Improve application performance (with minimal effort) thereby improving UX
2. Increase the scalability of your infrastructure, both the service tier and the persistence tier
3. Make your infrastructure more resilient to failure, more robust
4. Lower persistent storage costs

## Add HA to single server key/value data storage engines

Dynomite is a generic Dynamo implementation that adds the following capabilities to single-server key/value data storage engines:

- Sharding
- Replication
- High availability
- Linear scalability


## Simplified programming model for app developers

DynomiteDB eliminates the need for application developers to worry about shards, replica sets, or other complexities of distributed databases.




In the open source world, there are various single-server datastore solutions, e.g. Memcached, Redis, BerkeleyDb, LevelDb, Mysql (datastore). The availability story for these single-server datastores usually ends up being a master-slave setup. Once traffic demands overrun this setup, the next logical progression is to introduce sharding. Most would agree that it is non trivial to operate this kind of a setup. Furthermore, managing data from different shards is also a challenge for application developers.

In the age of high scalability and big data, Dynomite’s design goal is to turn those single-server datastore solutions into peer-to-peer, linearly scalable, clustered systems while still preserving the native client/server protocols of the datastores, e.g., Redis protocol.

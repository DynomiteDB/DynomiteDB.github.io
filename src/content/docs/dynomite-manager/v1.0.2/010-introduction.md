---
title: "Introduction"
slug: "introduction"
date: "2016-09-10T20:22:33-08:00"
product: "Dynomite Manager"
version: "v1.0.2"
type: "dynomite-manager-v1.0.2"
docurl: "/docs/dynomite-manager/v1.0.2/"
weight: 50
docsection: "Introduction"
draft: false

---

This document provides an introduction to the Dynomite Manager component of DynomiteDB. It explains the key concepts and terminology that you need to know to use Dynomite Manager.

## What is Dynomite Manager

DynomiteDB is an open source framework that turns any database into a scalable, distributed database. It provides Dynamo-like sharding, replication and high availability for various key/value database engines, which are called backends.

DynomiteDB makes it easy to deploy linearly scalable clusters of the following databases:

- Redis
- RocksDB
- LevelDB
- LMDB

A key benefit of DynomiteDB is that you can reuse the same database infrastructure for a wide variety of workloads, from a highly available, distributed cache that uses the Redis backend to a big data distributed database that uses the RocksDB backend. 

DynomiteDB provides the same Redis-compatible key/value API across all backends. A common API means that you can reuse your data model and queries for both persistent and in-memory workloads. This greatly simplifies application development and increases development velocity.

## Key/Value API

DynomiteDB provides access to all supported backends via the same Redis-compatible API. You can use the same Redis client, commands and data types that you are already using. With DynomiteDB, you gain instant scalability for your Redis servers with almost no changes to your code.

[Learn more about the DynomiteDB Key/Value API](/docs/key-value-api/v0.5.8/introduction/).

### Value data types

Dynomite supports a variety of value data type when the Redis database engine is used as a backend. Importantly, Redis is the primary and default backend used by Dynomite.

The following value data types are supported:

- String
- Hash
- List
- Set
- Sorted Set

## Key features

### High performance

Dynomite provides a high performance cache and database combined with linear scalability. Linear scalability means that Dynomite's capacity scales as you add more clusters to the server. Specifically, if one Dynomite server can handle 40,000 ops/second then we know that two Dynomite servers will handle 80,000 ops/second.

### High availability (HA)

Dynomite is a highly available server which means that Dynomite is able to `SET` and `GET` your cache data even when a server, rack or entire data center goes offline.

### Sharding and replication

Dynomite shards data by distributing various key/value pairs across the cluster. It then replicates each key/value pair by creating extra copies on multiple servers.

## Summary

Dynomite is a high performance, linearly scalable Dynamo layer that allows single-server database engines to operate as a cluster. Dynomite supports a variety of value data types.

## What's next

<ul>
    <li><a href="../quick-start/">Continue to the Quick Start to install DynomiteDB with Docker.</a></li>
    <li><a href="../quick-start-ubuntu/">Continue to the Quick Start to install DynomiteDB on Ubuntu using a <code>.deb</code> package.</a></li>
</ul>

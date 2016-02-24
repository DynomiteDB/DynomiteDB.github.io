---
title: "Introduction"
slug: "introduction"
date: "2016-02-07T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.6"
type: "dynomite-v0.5.6"
docurl: "/docs/dynomite/v0.5.6/"
weight: 50
draft: false

---

Welcome to Dynomite. This document provides a brief introduction to Dynomite and it introduces you to some key concepts and terminology.

## What is Dynomite

Dynomite is an open source Dynamo layer that provides sharding, data replication and high availability for various single-server key/value database engines. 

Specifically, Dynomite turns a single-server key/value database (ex. Redis) into a scalable, highly available clustered key/value database.

## Key/value database engine

A key/value database engine exposes a data model that is similar to a dictionary or hash. Data is saved by setting a key such as `city` to a value of `Palo Alto`. You retrieve the value by getting the key's value.

For example, Dynomite supports the Redis API to `SET` a key/value pair as follows:

```bash
SET city "Palo Alto"
```

You retrieve the value by issuing a `GET`:

```bash
get city
```

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

Dynomite provides high performance cache via linear scalability. Linear scalability means that Dynomite's capacity scales as you add more clusters to the server. Specifically, if one Dynomite server can handle 40,000 ops/second then we know that two Dynomite servers will handle 80,000 ops/second.

### High availability (HA)

Dynomite is a highly available server which means that Dynomite is able to `SET` and `GET` your cache data even when a server, rack or entire data center goes offline.

### Sharding and replication

Dynomite shards data by distributing various key/value pairs across the cluster. It then replicates each key/value pair by creating extra copies on multiple servers.

## Summary

Dynomite is a high performance, linearly scalable Dynamo layer that allows single-server database engines to operate as a cluster. Dynomite supports a variety of value data types.

<span class="pull-left">
    <a href="../quick-start/">Continue to the Quick Start to install DynomiteDB</a>
</span>

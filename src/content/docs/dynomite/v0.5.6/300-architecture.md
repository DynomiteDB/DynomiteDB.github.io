---
title: "Architecture"
slug: "architecture"
date: "2016-02-07T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.6"
type: "dynomite-v0.5.6"
docurl: "/docs/dynomite/v0.5.6/"
weight: 300
draft: false

---

<img class="img-responsive center-block"
     src="/img/dynomite/v0.5.6/dynomite-architecture.png" 
     alt="Dynomite Architecture">

<!-- LARGE DIAGRAM OF ENTIRE CLUSTER as banner image -->

DynomiteDB is a distributed caching database that is designed to run with multiple servers working together as part of a cluster. The servers in a DynomiteDB cluster use a shared nothing architecture as part of a peer-to-peer token ring. There is no single point of failure (SFOF) and each server in the cluster has the same functionality.

DynomiteDB is queried using a Redis-compatible API that is easy to learn and simple to use. The Redis API is a simple API that allows you to `GET` and `SET` key/value pairs. DynomiteDB supports multiple data types for the value side of the key/value pair including String, Hash, List, Set and Sorted Set. 

In terms of the CAP theorem, DynomiteDB chooses <strong>A</strong>vailability and <strong>P</strong>artition tolerance over <strong>C</strong>onsistency. Specifically, DynomiteDB has tunable consistency on a cluster-wide basis where queries can make tradeoffs between consistency, latency and availability.

DynomiteDB is designed for big data workloads that have a large volume of data combined with a high volume of reads, writes or both. The primary use case for DynomiteDB is as a big data cache that can store your entire data set in cache.

# Shared nothing, masterless architecture

DynomiteDB has a shared nothing, masterless architecture which means that each DynomiteDB node is independent of every other node. The benefit of a shared nothing architecture is there is no centralized component that can bring down the entire cluster. In other words, DynomiteDB has no single point of failure (SPOF).

A shared nothing architecture contributes to DynomiteDB's high availability and linear scalability. The fact that DynomiteDB has no SPOF means that the cluster will continue to work even when a server, rack or data center (DC) is offline. This means that you can perform maintenance and upgrades with zero downtime to your cache infrastructure.

Each node in a DynomiteDB cluster is equal to every other node. Specifically, each node runs the exact same `dynomite` daemon and provides the exact same functionality as every other node.

<!-- SHOW DIAGRAM OF DYNOMITE'S INTERNAL BLOCK DIAGRAM HERE -->

# Cluster

<!-- SHOW IMAGE HERE OF ENTIRE CLUSTER -->

DynomiteDB's top level container is the cluster. A DynomiteDB cluster operates as a single, large cache that may span one or more data centers. The ability to span multiple data centers allows DynomiteDB to operate normally even when an entire data is offline.

## Data center (DC)

A data center (DC) contains one or more racks. A DC is equivalent to an AWS region.

## Rack

A rack contains one or more servers. Importantly, data replication happens at the rack level as each rack contains the entire token ring. In other words, if a DC contains 3 racks, then the DC will have a replication factor (RF) of 3.

A rack is equivalent to an AWS availability zone (AZ).

## Server

<!-- TODO: Update the Server definition to include the concept of a Container -->

A server represents either a physical server in your data center or a virtual machine hosted by a cloud provider (ex. an EC2 instance on AWS).

Each server contains a Dynomite instance and a Redis instance.

## Dynomite node (aka Node)

A Dynomite node is an instance of the `dynomite` daemon that runs on a server. Each `dynomite` instance uses one Redis instance as its backend storage.

Each Dynomite node has a node token that is unique within a rack. In other words, only 1 node per rack may have the same token. However, tokens may repeat across different racks. In fact, it is normal and expected for node tokens to repeat on different racks.

Importantly, DynomiteDB identifies each node as a combination of the node's data center, rack and token.

### Node token

Each node has a node token with a value from 0 to 4,294,967,295. The node token indicates the range of data that the node owns. For example, if a node (Node1) has node token = 0 and the next node in the same rack (Node2) has a node token = 1000, then Node1 owns all data with a token value from 0 to 999.

> The token value for each key/value pair is calculated as a hash of the key.

If two nodes in different racks are assigned the same node token then they share a replica of each key/value pair that is within their token range. To continue the example above, if a 2<sup>nd</sup> rack has a node (Node3) with node token = 0, then all data with a data token from 0 to 999 is replicated on both Rack1 Node1 and Rack2 Node3.

See [Replication](../replication/) or [Topology](../topology/) for more information.

## Redis

Each DynomiteDB node uses Redis as its backend storage engine. A Redis instance is an instance of the `redis-server` process that runs on a server.

### Redis API

DynomiteDB exposes a standard Redis API which means that you can use any Redis client to access DynomiteDB. The use of a standard Redis API means that DynomiteDB frees you to focus on your application and eliminates the complexity of sharding, replication and other complex distributed database topics. 

Upgrading from a single Redis instance to DynomiteDB is easy as very few, if any, changes are required for your application.

For example, the following Redis commands work both on a single server Redis instance and on a DynomiteDB cluster:

```bash
SET product "DynomiteDB"

GET product
```

<!-- show entire cluster access via Redis API -->

See [API](../api/) for more information.

# Summary

DynomiteDB is a high performance, highly available (HA) and distributed caching database. DynomiteDB chooses to be highly available and partition tolerant, while providing tunable consistency.

DynomiteDB has a shared nothing, masterless architecture with no single point of failure (SPOF). DynomiteDB's architecture allows it to scale linearly while being highly resilient against server, rack or DC failure.

The key concepts used by DynomiteDB are:

- Cluster
- Data center (DC)
- Rack
- Server
    - Dynomite node (node)
    - Redis

DynomiteDB encapsulates the complexity of a distributed caching database and simplifies the development of applications with a Redis-compatible API. In other words, developers can focus on their application while DynomiteDB automatically provides sharding, replication and other advanced distributed database capabilities.

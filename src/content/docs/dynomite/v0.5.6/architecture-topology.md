---
title: "Topology"
date: "2016-02-07T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.6"
type: "dynomite-v0.5.6"
docurl: "/docs/dynomite/v0.5.6/"

---

A Dynomite cluster consists of multiple data centers (dc). A datacenter is a group of racks and rack is a group of nodes. Each rack consists of the entire dataset, which is partitioned across multiple nodes in that rack. Hence multiple racks enable higher availability for data. Each node in a rack has a unique token, which helps to identify which dataset it owns. 

<img src="/img/dynomite/v0.5.6/cluster-topology.png" alt="Cluster Topology">

Each Dynomite node (e.g., a1 or b1 or c1) has a Dynomite process co-located with the datastore server, which acts as a proxy, traffic router, coordinator and gossiper. In the context of the Dynamo paper, Dynomite is the Dynamo layer with additional support for pluggable datastore proxy, with an effort to preserve the native datastore protocol as much as possible.

A datastore can be either a volatile datastore such as Memcached or Redis, or persistent datastore such as Mysql, BerkeleyDb or LevelDb. Our current open sourced Dynomite offering supports Redis and Memcached.

<img src="/img/dynomite/v0.5.6/intra-node-architecture.png" alt="Intra-node Architecture">



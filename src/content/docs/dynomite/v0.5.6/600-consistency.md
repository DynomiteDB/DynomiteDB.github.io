---
title: "Consistency"
slug: "consistency"
date: "2016-02-07T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.6"
type: "dynomite-v0.5.6"
docurl: "/docs/dynomite/v0.5.6/"
weight: 600

---

Dynomite (ver >0.5.3) extends eventual consistency to tunable consistency in the local region. The consistency level specifies how many replicas must respond to a write/read request before returning data to the client application. Read and write consistency can be configured to manage availability versus data accuracy. Consistency can be configured for read or write operations separately (cluster-wide). There are two configurations.

**DC_ONE**: Reads and writes are propagated synchronously only to the node in the local rack (Availability Zone) and asynchronously replicated to other Racks and regions.

**DC_QUORUM**: Reads and writes are propagated synchronously to quorum number of nodes in the local data center and asynchronously to the rest. The DC_QUORUM configuration writes to the number of nodes that make up a quorum. A quorum is calculated, and then rounded down to a whole number. The operation succeeds if the read/write succeeded on a quorum number of nodes.

## Configuration

There are two ways to configure consistency. The first is in the YAML file and it is picked up on Dynomite's start. The entries in the YAML must appear as follows (the values are case insensitive):

```bash
read_consistency: dc_quorum
write_consistency: dc_quorum
```

The second is during run time through the admin port (default 22222) on all nodes:

```bash
curl http://localhost:22222/set_consistency/read/dc_quorum

curl http://localhost:22222/set_consistency/write/dc_quorum
```

To check the node level consistency:

```bash
curl http://localhost:22222/get_consistency
```

The expected output from the curl command above is a list of the current consistency levels. For example:

```bash
Read Consistency: DC_QUORUM
Write Consistency: DC_QUORUM
```

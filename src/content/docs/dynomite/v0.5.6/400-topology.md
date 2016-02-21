---
title: "Topology"
slug: "topology"
date: "2016-02-07T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.6"
type: "dynomite-v0.5.6"
docurl: "/docs/dynomite/v0.5.6/"
docsection: "Architecture"
weight: 400
draft: false

---

<!-- focus on the physical and logical network -->

DynomiteDB's network topology defines the overall structure of a DynomiteDB cluster including the location and configuration of nodes within each data center (DC), rack and server.

System Administrators and DevOps staff must fully understand DynomiteDB's network topology. However, application developers do not require a deep knowledge of DynomiteDB's topology in order to develop applications that use DynomiteDB.  

Importantly, DynomiteDB's topology determines the replication factor (RF). In a standard configuration, the RF within a DC is equal to the number of racks in that DC. For example, if your company has a San Francisco DC (named SFO) with 3 racks, then the RF for SFO is 3.

A cluster's topology includes the following elements:

- Data centers (DCs)
- Racks
- Servers
- Nodes and node tokens
- Backends

> On Amazon Web Services (AWS), a DC = region, a rack = availability zone (AZ) and a server = an EC2 instance.

# Topology hierarchy

A DynomiteDB cluster has a well defined hierarchy.

- A cluster is comprised of one or more data centers (DCs)
- Each DC contains one or more racks
- Each rack contains one or more servers
- Each server contains a node (i.e. a `dynomite` instance) and a backend (ex. Redis or ForestDB)
- Each node has a node token between 0 and 4,294,967,295

<!-- Show topology hierarchy visually -->

# Cluster

The DynomiteDB cluster is a conceptual container that contains one or more DCs. In each of the sections below we will discuss various topologies.

## Tokens

DynomiteDB uses the term **token** in three ways:

- Token range
- Node token
- Data token

The important point is that these three uses of **token** overlap, as explained below. 

### Token range

The token range is the entire range of allowed tokens. The token range is from 0 to 4,294,967,295.

The token range defines the minimum and maximum values of both node tokens and data tokens.

### Node token

Each node has a node token that indicates the beginning of the range of data tokens that the node owns. The node token is a value within the token range.

The token range is typically divided equally between each of the servers within a rack. For example, if a rack has 3 servers of equal size (same CPU, memory, disk, etc.) then the node on each server will own 1/3 of the token range.

The formula to calculate the node token is displayed below. `numberOfNodesInRack` is a count of the servers/nodes within a rack. `nodeIndex` is the node's index (starting at 0) within the rack.

```bash
nodeToken = (4294967295 / numberOfNodesInRack) * nodeIndex
```

Using the above formula, we can calculate the node index for 3 nodes within a rack as follows:

```bash
firstNodeToken = (4294967295 / 3) * 0 = 0
secondNodeToken = (4294967295 / 3) * 1 = 1431655765
thirsNodeToken = (4294967295 / 3) * 2 = 2863311530
```

### Data token

A data token is a hash of the key portion of a key/value pair. The key is hashed using a consistent hashing algorithm which outputs the data token. The data token is then compared against the node tokens to determine which nodes own the data token. In other words, the data token and node token determine where each key/value pair is located within a rack.

A node owns all data tokens within the data token range, which is calculated as follows:

```bash
minDataToken = nodeToken

maxDataToken = nextNodeToken - 1 
```

A node owns all key/value pairs with a data token from `minDataToken` to `maxDataToken`.

## Single DC cluster with single rack
<!-- TODO: Diagram -->

<img class="img-responsive center-block"
     style="width: 75%;"
     src="/img/dynomite/v0.5.6/topology-1dc-1rack.svg"
     alt="1 DC, 1 rack, 3 servers">
<p class="dyno-image-caption text-center">1 DC, 1 rack, 3 servers</p>

> Never use a single DC with a single rack in production as this topology lacks replication, redundancy and HA. It is discussed here for learning purposes only.

A cluster with a single DC that contains a single rack is an overly simple topology that can be used during development but should not be used for production deployments. The cluster is comprised of a single DC which contains a single rack. The single rack contains three servers whose node tokens span the entire token range.

The following are the names of the various topology elements (indentation indicates the topology hierarchy):

- **DC**: sfo (San Francisco)
    - **Rack**: dev
        - **Servers**:
            - s1 (node token = 0)
            - s2 (node token = 1431655765)
            - s3 (node token = 2863311530)

Each rack in a DynomiteDB cluster contains the entire token range which means that the number of racks per DC is how you determine the replication factor (RF) per DC. Replication factor (RF) is the number of replicas (i.e. copies) of each key/value pair.

In this example we have one rack which means `RF = 1`.

> A rack contains the entire token range. The number of racks per data center (DC) sets the replication factor (RF) per DC.

In the diagram above, the rack contains 3 servers with the node token specified next to each server's hostname. Each server contains one instance of `dynomite` (i.e. the node) and one instance of `redis-server` (i.e. the backend). Please note that DynomiteDB supports pluggable backends which means that you can replace `redis-server` with a different backend. 

The entire cluster is exposed to clients via a Redis-compatible API. From an application developers perspective the DynomiteDB cluster operates similarly to a single Redis server. The fact that an application developer does not have to think about sharding, replication, redundancy or another other distributed database concepts is extremely powerful as it contributes to faster development velocity.

### Servers and nodes

<img class="img-responsive center-block"
     style="height: 275px;"
     src="/img/dynomite/v0.5.6/intra-node-architecture.png" 
     alt="Intra-server Architecture">

A server is either a physical server or a virtual machine (such as an AWS EC2 instance).

Each server within the rack contains a node (a `dynomite` instance) and a backend (a `redis-server` instance or other backend). A key feature of DynomiteDB is pluggable backends which means that you can use DynomiteDB as a big data cache or database. To use DynomiteDB as a cache use an in-memory backend, such as Redis. To use DynomiteDB as a database use a persistent backend, such as ForestDB.

The node (i.e. the `dynomite` instance) is a Dynamo-inspired server that provides the following capabilities:

- High availability (HA)
- Linear scalability
- Sharding
- Replication
- Traffic router across the DynomiteDB cluster
- Coordinator
- Gossiper
- Pluggable backends
- Proxying for the backend

DynomiteDB currently supports Redis as its primary backend. However, DynomiteDB supports pluggable backends and will add support for other backends, such as ForestDB, LMDB and Memcached, in the future. 

A backend, which is technically a database storage engine, can provide volatile storage, persistent storage or a combination of both. Examples of volatile storage engines include Redis and Memcached. Examples of persistent storage engines include LMDB, RocksDB, LevelDB and ForestDB. 

### Node tokens

The following table shows the node tokens and data token ownership range.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>Server</th>
        <th>Node token</th>
        <th>Min data token</th>
        <th>Max data token</th>
    </tr>
    <tr>
        <td>s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td>s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td>s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
</table>

The formulas used to calculate the data token ownership range follow below:

```bash
minDataToken = nodeToken

maxDataToken = nextNodeToken - 1 
```

## Single DC cluster with three racks
<!-- TODO: Diagram -->

<img class="img-responsive center-block"
     style="width: 75%;"
     src="/img/dynomite/v0.5.6/topology-1dc-3racks.svg"
     alt="1 DC, 3 rack, 9 servers">
<p class="dyno-image-caption text-center">1 DC, 3 racks, 3 servers per rack</p>

The cluster is comprised of a single DC which contains three racks and each rack contains three servers. Each server contains a node (a `dynomite` instance) and a backend (a `redis-server` instance).

A cluster with a single DC that contains three racks is a production ready topology when HA in case of DC failure is not required.

The following are the names of the various topology elements (indentation indicates the topology hierarchy):

- **DC**: sfo (San Francisco)
    - **Rack**: r1
        - **Servers**:
            - r1s1 (node token = 0)
            - r1s2 (node token = 1431655765)
            - r1s3 (node token = 2863311530)
    - **Rack**: r2
        - **Servers**:
            - r2s1 (node token = 0)
            - r2s2 (node token = 1431655765)
            - r2s3 (node token = 2863311530)
    - **Rack**: r3
        - **Servers**:
            - r3s1 (node token = 0)
            - r3s2 (node token = 1431655765)
            - r3s3 (node token = 2863311530)

Each rack contains the entire token range which means that `RF = 3` in this example. Specifically, a key/value pair where the data token = `100` will be replicated on r1s1, r2s1 and r3s1.

### Node tokens

In this example there are three racks, each of which contains three servers of equal size. The following table shows the node tokens and data token ownership range.

The following are the some salient points about the topology described in the table below:

- Each node token is used by three nodes, one node per rack
- Node tokens can repeat across racks, but not within a rack
- Data token ownership is repeated three times, which indicates how data is replicated across the three racks
- Data token ownership is repeated across racks, but not within a rack
- Replication
    - Data tokens from 0 to 1431655764 are replicated on r1s1, r2s1 and r3s1
    - Data tokens from 1431655765 to 2863311529 are replicated on r1s2, r2s2 and r3s2
    - Data tokens from 2863311530 to 4294967295 are replicated on r1s3, r2s3 and r3s3

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>Rack</th>
        <th>Server</th>
        <th>Node token</th>
        <th>Min data token</th>
        <th>Max data token</th>
    </tr>
    <tr>
        <td>r1</td>
        <td>r1s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td>r1</td>
        <td>r1s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td>r1</td>
        <td>r1s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
    <tr>
        <td>r2</td>
        <td>r2s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td>r2</td>
        <td>r2s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td>r2</td>
        <td>r2s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
        <td>r3</td>
        <td>r3s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td>r3</td>
        <td>r3s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td>r3</td>
        <td>r3s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
</table>

The formulas used to calculate the data token ownership range follow below:

```bash
minDataToken = nodeToken

maxDataToken = nextNodeToken - 1 
```

## Two DC cluster with three racks per DC
<!-- TODO: Diagram -->

TODO: Delete the original image after I create a new image.

<img class="img-responsive center-block"
     style="width: 75%;"
     src="/img/dynomite/v0.5.6/cluster-topology.png"
     alt="Cluster Topology">

<img class="img-responsive center-block"
     style="width: 75%;"
     src="/img/dynomite/v0.5.6/topology-2dcs-6racks.svg"
     alt="Single DC cluster with single rack">
<p class="dyno-image-caption text-center">2 DCs, 3 racks per DC, 3 servers per rack</p>

The cluster is comprised of a single DC which contains three racks and each rack contains three servers. Each server contains a node (a `dynomite` instance) and a backend (a `redis-server` instance).

A cluster with a two DCs that contains three racks per DC and 3 servers per rack is a robust, production ready topology that is resilient against server, rack and DC failure.
 
The following are the names of the various topology elements (indentation indicates the topology hierarchy):

- **DC**: sfo (San Francisco)
    - **Rack**: sfo-r1
        - **Servers**:
            - sfo-r1-s1 (node token = 0)
            - sfo-r1-s2 (node token = 1431655765)
            - sfo-r1-s3 (node token = 2863311530)
    - **Rack**: sfo-r2
        - **Servers**:
            - sfo-r2-s1 (node token = 0)
            - sfo-r2-s2 (node token = 1431655765)
            - sfo-r2-s3 (node token = 2863311530)
    - **Rack**: sfo-r3
        - **Servers**:
            - sfo-r3-s1 (node token = 0)
            - sfo-r3-s2 (node token = 1431655765)
            - sfo-r3-s3 (node token = 2863311530)
- **DC**: jfk (New York)
    - **Rack**: jfk-r1
        - **Servers**:
            - jfk-r1-s1 (node token = 0)
            - jfk-r1-s2 (node token = 1431655765)
            - jfk-r1-s3 (node token = 2863311530)
    - **Rack**: jfk-r2
        - **Servers**:
            - jfk-r2-s1 (node token = 0)
            - jfk-r2-s2 (node token = 1431655765)
            - jfk-r2-s3 (node token = 2863311530)
    - **Rack**: jfk-r3
        - **Servers**:
            - jfk-r3-s1 (node token = 0)
            - jfk-r3-s2 (node token = 1431655765)
            - jfk-r3-s3 (node token = 2863311530)

Each rack contains the entire token range which means that `RF = 3` for each of the SFO and JFK DCs. The RF cluster-wide is 6. Specifically, a key/value pair where the data token = `100` will be replicated on sfo-r1-s1, sfo-r2-s1 and sfo-r3-s1 within the SFO DC, plus jfk-r1-s1, jfk-r2-s1 AND jfk-r3-s1 within the JFK DC.

### Node tokens

In this example there are six racks, each of which contains three servers of equal size. The following table shows the node tokens and data token ownership range.

The following are the some salient points about the topology described in the table below:

- Each node token is used by six nodes, one node per rack and three per DC
- Node tokens can repeat across racks, but not within a rack
- Node tokens can repeat across DCs
- Data token ownership repeats three times per DC, which defines the RF per DC
- Data token ownership repeats six times across the cluster which indicates the total number of replica cluster-wide
- Data token ownership repeats across racks, but not within a rack
- Data token ownership repeats across DCs
- Replication
    - Data tokens from 0 to 1431655764 are owned by and replicated on sfo-r1-s1, sfo-r2-s1, sfo-r3-s1, jfk-r1-s1, jfk-r2-s1 and jfk-r3-s1
    - Data tokens from 1431655765 to 2863311529 are owned by and replicated on sfo-r1-s2, sfo-r2-s2, sfo-r3-s2, jfk-r1-s2, jfk-r2-s2 and jfk-r3-s2
    - Data tokens from 2863311530 to 4294967295 are owned by and replicated on sfo-r1-s3, sfo-r2-s3, sfo-r3-s3, jfk-r1-s3, jfk-r2-s3 and jfk-r3-s3

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>DC</th>
        <th>Rack</th>
        <th>Server</th>
        <th>Node token</th>
        <th>Min data token</th>
        <th>Max data token</th>
    </tr>
    <tr>
        <td>sfo</td>
        <td>r1</td>
        <td>sfo-r1-s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td></td>
        <td></td>
        <td>sfo-r1-s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td></td>
        <td></td>
        <td>sfo-r1-s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
    <tr>
        <td></td>
        <td>r2</td>
        <td>sfo-r2-s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td></td>
        <td></td>
        <td>sfo-r2-s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td></td>
        <td></td>
        <td>sfo-r2-s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
        <td></td>
        <td>r3</td>
        <td>sfo-r3-s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td></td>
        <td></td>
        <td>sfo-r3-s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td></td>
        <td></td>
        <td>sfo-r3-s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
    <tr>
        <td>jfk</td>
        <td>r1</td>
        <td>jfk-r1-s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td></td>
        <td></td>
        <td>jfk-r1-s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td></td>
        <td></td>
        <td>jfk-r1-s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
    <tr>
        <td></td>
        <td>r2</td>
        <td>jfk-r2-s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td></td>
        <td></td>
        <td>jfk-r2-s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td></td>
        <td></td>
        <td>jfk-r2-s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
        <td></td>
        <td>r3</td>
        <td>jfk-r3-s1</td>
        <td>0</td>
        <td>0</td>
        <td>1431655764</td>
    </tr>
        <td></td>
        <td></td>
        <td>jfk-r3-s2</td>
        <td>1431655765</td>
        <td>1431655765</td>
        <td>2863311529</td>
    </tr>
        <td></td>
        <td></td>
        <td>jfk-r3-s3</td>
        <td>2863311530</td>
        <td>2863311530</td>
        <td>4294967295</td>
    </tr>
</table>

The formulas used to calculate the data token ownership range follow below:

```bash
minDataToken = nodeToken

maxDataToken = nextNodeToken - 1 
```

# Summary

Understanding the network topology is a critical task for System Administrators and operations staff. However, application developers are free to focus on application requirements as DynomiteDB's Redis-compatible API provides a simple API that abstracts away the implementation details of DynomiteDB's distributed nature.

The key elements in a DynomiteDB cluster's topology are:

- Data center (DC)
- Rack
- Server
- Node and node token
- Backend

The number of racks per DC defines the replication factor (RF).

If your infrastructure runs on Amazon Web Services (AWS), then the topology elements map to AWS concepts as follows:

- Data center (DC) = region
- Rack = availability zone (AZ)
- Server = EC2

If your application runs within a single DC, then you may choose to run a topology with a single DC and three racks. However, if your application has high availability, scalability and performance requirements then a multi-DC, multi-rack per DC topology is a better choice.

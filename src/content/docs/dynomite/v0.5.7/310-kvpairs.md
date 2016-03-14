---
title: "Key/value pairs"
slug: "kvpairs"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.7"
type: "dynomite-v0.5.7"
docurl: "/docs/dynomite/v0.5.7/"
docsection: "Data"
weight: 910
draft: false

---

**Backend**: `Redis`

A key/value pair is the main physical unit of data in DynomiteDB. As the unit of data, each key/value pair is replicated around the cluster based on the replication factor (RF). In DynomiteDB the RF is set based on the network topology.

DynomiteDB's key/value pairs support rich data structures where the value side of the key value pair may be a String, Hash, List, Set or Sorted Set. You can compose these primitive types (i.e String, Hash, List, Set and Sorted Set) into complex data models. 

When working with DynomiteDB it is important to remember that its key/value pairs support rich data structures that are far more powerful and useful than the simple string key with string value pairs supported by other key/value servers.

DynomiteDB supports a cache size of 4,294,967,295 key/value pairs per cluster.

In production, it is normal to use multiple DynomiteDB clusters to support different microservices. When multiple clusters are deployed the total number of key/value pairs supported by DynomiteDB is `4,294,967,295 x numberOfClusters`. 

# Data token

When a request is sent to DynomiteDB, the key is hashed using a consistent hashing algorithm that converts the key into a data token. The data token is a value between 0 and 4,294,967,295.

The data token is used to determine which nodes are the replica nodes for each key/value pair. Specifically, each node has a node token that represents the lower bound of the data token range for key/value pairs that it owns. The upper bound of the data token range is `nodeTokenOfNextNode - 1`.

The table below has an example rack with three nodes nodeA, nodeB and nodeC.

The node tokens for NodeA, NodeB and NodeC are `0`, `1,431,655,765` and `2,863,311,530`, respectively. 

Notice how each node owns a data token range that starts with its node token and ends with one less than the next node's node token.

If a key/value pair with a data token of 2863311520 is written to DynomiteDB then the key/value pair will be saved in NodeB.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>Node</th>
        <th>Node token</th>
        <th>Min data token</th>
        <th>Max data token</th>
    </tr>
    <tr>
        <td>NodeA</td>
        <td>0</td> 
        <td>0</td> 
        <td>1431655764</td> 
    </tr> 
    <tr>
        <td>NodeB</td>
        <td>1431655765</td> 
        <td>1431655765</td> 
        <td>2863311529</td> 
    </tr>
    <tr>
        <td>NodeC</td>
        <td>2863311530</td> 
        <td>2863311530</td> 
        <td>4294967295</td> 
    </tr>
</table>

<!--
    TODO
    1. Add new sections for Key, Value
    2. In the value section, document each of the supported value types (i.e String, Hash, List, Set and Sorted Set)
-->

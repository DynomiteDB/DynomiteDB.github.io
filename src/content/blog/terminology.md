---
title: "Terminology"
description: "Learn the key terminology used to discuss DynomiteDB"
date: "2016-02-10T08:08:08-08:00"
draft: true
author: "Akbar S. Ahmed"
authors:
  - "Akbar S. Ahmed"
email: "akbar501@gmail.com"
categories:
  - "DynomiteDB"
tags:
  - "DynomiteDB"
  - "Sharding"
  - "Replication"

---

Understanding terminology related to DynomiteDB is key to learning and using it. Fortunately, DynomiteDB has a relatively small technical footprint which means that there are few terms and concepts to learn.

DynomiteDB is a fast, distributed and highly available cache. It is comprised of two server components, Dynomite and Redis, and one client component, Dyno. The most significant aspect of DynomiteDB is that the Dynomite server is Dynamo inspired. Many of the terms and concepts used to discuss DynomiteDB will be familiar to Cassandra users or other Dynamo inspired databases.

In this post, I propose that we (the DynomiteDB community) standardize terminology and try to limit terms to a single abstraction layer when possible. When a term must span multiple abstraction layers, say from Dynomite to physical, then it should refer to the same thing.

Please bear in mind I'm not trying to make this an "I'm right" kind of article. The goal is to improve DynomiteDB terminology by making it less ambiguous so that we all use the same terms to refer to the same things and to start a discussion on what terminology should be used to discuss DynomiteDB.

## Proposed terminology

### Network topology

The first thing you want to understand is DynomiteDB's architecture from the network level. DynomiteDB is a distributed cache which is commonly referred to as a cluster. In the table below we will begin by defining what a DynomiteDB cluster is and then we'll start to 

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>Term</th>
        <th>Definition</th>
    </tr>
    <tr>
        <td>Cluster</td>
        <td>
            <p>TODO</p>
        </td> 
    </tr> 
    <tr>
        <td>Data Center</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Rack</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Server</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Node (i.e. a Dynomite instance)</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Dynomite</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Redis</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Memcached</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Key</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Value</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Sharding</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
    <tr>
        <td>Replication</td>
        <td>
            <p>TODO</p>
        </td>
    </tr>
</table>

## Summary

As a community we all benefit from clear terminology. It makes it easier to understand, learn and communicate about Cassandra. Each term should be used in only one abstraction layer, if at all possible. When a term must be used across multiple layers then it should always refer to the same thing.

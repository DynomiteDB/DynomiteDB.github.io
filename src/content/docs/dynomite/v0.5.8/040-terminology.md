---
title: "Terminology"
slug: "terminology"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.8"
type: "dynomite-v0.5.8"
docurl: "/docs/dynomite/v0.5.8/"
docsection: "Introduction"
weight: 250
draft: false

---

This document defines the core terminology used by DynomiteDB. It is designed to be used as a reference, however reading it top-to-bottom is also a good use of this document.

A primary goal of this document is to provide you with the terminology necessary to learn, understand and discuss DynomiteDB. The last point is important. The establishment of well defined terms for each component of DynomiteDB makes it easier for all of us in the DynomiteDB community to talk about, write about and generally communicate our thoughts in way that can be easily understood by other members of our community.

# Distributed database terminology

The following table contains definitions for general distributed database terminology.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>Term</th>
        <th>Definition</th>
    </tr>
    <tr>
        <td>Shared nothing architecture</td>
        <td>
            <p>A shared nothing architecture means that servers in a cluster do not share CPU, memory, or disk. Further, a shared nothing architecture means there are no central resources, such as a database or application server, that the servers all depend on.</p>
        </td> 
    </tr>
    <tr>
        <td>Masterless architecture</td>
        <td>
            <p>A masterless architecture (aka a peer-to-peer architecture) means that each node provides the same functionality as every other node. By contract, a master/slave architecture has "special" nodes that are more important than the slave nodes and where the master nodes exert unidirectional control over the slaves.</p>
            <p>A key benefit of a masterless architecture is that avoids master elections and therefore reduces downtime due to elections and switchovers. Further, a masterless architecture is linearly scalable as any node can accept both reads and writes.</p>
        </td> 
    </tr>
    <tr>
        <td>SPOF</td>
        <td>
            <p>Importantly, DynomiteDB has no single point of failure (SPOF).</p>
            
            <p>A shared something architecture, as opposed to shared nothing architecture, has one or more single points of failure (SPOF). The problem with an SPOF is that the failure of a single subsystem can render a cluster incapable of servicing read requests, write requests or both.</p>
        </td> 
    </tr>
    <tr>
        <td>Linear scalability</td>
        <td>
            <p>Linear scalability refers to the ability of a distributed system to increase capacity in proportion to the additional resources added by a new server. In other words, a linearly scalable system does not experience increasing overhead as servers are added to the system.</p>
            
            <p>The primary benefits of a linearly scalable system are efficient hardware usage, simplified capacity planning and improved scalability of the overall system.</p>
        </td> 
    </tr>
    <tr>
        <td>High availability (HA)</td>
        <td>
            <p>High availability (HA) refers to a distributed system's ability to operate at full capacity even when components of the overall system fail. In other words, an HA cluster continues to serve read and write requests even when a server, rack or data center fails.</p>
        </td> 
    </tr>
    <tr>
        <td>Consistency</td>
        <td>
            <p>Data consistency refers to the ability to read data immediately after it is written. Immediately consistent databases pay an immediate latency penalty on every request and suffer from reduced availability but benefit from the simplicity of data consistency. Eventually consistent databases enjoy lower latency and improved availability at the expense of an increased probability of reading stale data.<p>
            
            <p>DynomiteDB has tunable consistency where you can choose between immediate consistency and eventual consistency within the local DC.</p>
        </td> 
    </tr>
    <tr>
        <td>Consistency level (CL)</td>
        <td>
            <p>DynomiteDB allows you to choose between two consistency levels:</p>
            <ul>
                <li><code>DC_ONE</code>: Eventually consistent with low latency, high throughput</li>
                <li><code>DC_QUORUM</code>: Immediately consistent with higher latency, lower throughput than <code>DC_ONE</code></li>
            </ul>
            
            <p>85 milliseconds is an average amount of time for all eventually consistent replicas to synchronize. However, you should measure eventual consistency for your network to verify that this average holds true for your configuration.</p>
        </td> 
    </tr>
    <tr>
        <td>Sharding</td>
        <td>
            <p>Sharding is a form of horizontal partitioning where data is split among multiple servers. In DynomiteDB the key/value pair is the primary unit of data. The key portion of the key value pair is hashed using a consistent hashing algorithm that converts the key into a data token. The data token is then compared against each node's node token to determine which node owns the data.</p>
        </td> 
    </tr>
    <tr>
        <td>Replication</td>
        <td>
            <p>Data replication refers to the ability of a distributed database to store multiple copies of data across multiple servers. Replication increases data availability and is a core component of high availability. Each copy of the data is called a replica.</p>
            
            <p>DynomiteDB uses the key/value pair as the unit of replication.</p>
        </td> 
    </tr>
</table>


# DynomiteDB terminology

DynomiteDB is a distributed database with support for pluggable in-memory and persistent backends. The table below defines terminology that is specific to DynomiteDB.

DynomiteDB is a Dynomo-inspired database which means that many of the following terms also apply to other Dynomo-inspired systems.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>Term</th>
        <th>Definition</th>
    </tr>
    <tr>
        <td>Cluster</td>
        <td>
            <p>A cluster is the top level container in DynomiteDB. A cluster operates as a single, large database or cache that spans one or more data centers. The ability to span multiple data centers allows a cluster to operate normally even when an entire data center (DC) is offline.</p>
            
            <p>DynomiteDB operates as a big data cache cluster when an in-memory backend, such as Redis, is in use. When coupled with a persistent storage backend, such as ForestDB, DynomiteDB operates as a big data key/value database.</p>
        </td> 
    </tr>
    <tr>
        <td>Data center (DC)</td>
        <td>
            <p>A data center (DC) contains one or more racks. A DC may be a physical data center used by your company or a virtual DC such as an AWS region.</p>
        </td> 
    </tr>
    <tr>
        <td>Rack</td>
        <td>
            <p>A rack contains one or more servers. A rack may be a physical rack located within your DC or it may be a virtual rack such as an AWS availability zone (AZ).</p> 
            
            <p>A rack plays a central role in a DynomiteDB cluster as replication happens at the rack level. Each rack contains the entire token ring which means that each rack contains your entire data set.</p>
        </td>
    </tr>
    <tr>
        <td>Token range</td>
        <td>
            <p>The token range is the complete set of tokens used to store your data set in DynomiteDB. The token range starts at 0 and ends at 4,294,967,295.</p>
            
            <p>Each rack contains the entire token range.</p>
        </td> 
    </tr>
    <tr>
        <td>Server</td>
        <td>
            <p>A server represents either a physical server in your DC or a virtual machine hosted by a cloud provider (ex. an EC2 instance on AWS).</p>
               
            <p>Each server contains a Dynomite instance and a Redis instance.</p>
        </td> 
    </tr>
    <tr>
        <td>Node</td>
        <td>
            <p>A Dynomite node is an instance of the <code>dynomite</code> daemon that runs on a server. Each <code>dynomite</code> instance uses one backend, such as Redis or ForestDB, as it's storage.</p>
        </td> 
    </tr>
    <tr>
        <td>Node token</td>
        <td>
            <p>Each Dynomite node has a node token with a value from 0 to 4,294,967,295, which is the same set of values available in the token range. The nodes within a rack will collectively own all values within the token range.</p> 
            
            <p>A node owns all data with a data token between the value of the node token and one minus the next node's node token, inclusive.</p>
        </td> 
    </tr>
    <tr>
        <td>Backend</td>
        <td>
            <p>DynomiteDB supports pluggable backends which means that you can pick a database storage engine that best matches your workload.</p>
            
            <p>A significant benefit of pluggable backends is that you can use DynomiteDB as a high performance, highly available and linearly scalable distributed cluster for both your cache and your database. For example, you can use Redis as the backend for your big data cache cluster and ForestDB as the backend for your big data database cluster.</p>
        </td> 
    </tr>
</table>

# Data and data access

DynomiteDB exposes a simple Redis-compatible API to application developers. The use of a simple API means that application developers can focus on the requirements of their application while leaving distributed systems details to system administrators  and operations staff.

The table below defines DynomiteDB's data and data access terminology. 

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>Term</th>
        <th>Definition</th>
    </tr>
    <tr>
        <td>Key/value pairs</td>
        <td>
            <p>A key/value pair is the primary unit of data in DynomiteDB.</p>
        </td> 
    </tr>
    <tr>
        <td>Key</td>
        <td>
            <p>A key in is a string value used to identify a key/value pair.</p>
        </td> 
    </tr>
    <tr>
        <td>Data token</td>
        <td>
            <p>A data token is the hashed value of the key. The data token has a value between 0 and 4,294,967,295 and is created by hashing the key with a consistent hashing algorithm.</p>
        </td> 
    </tr>
    <tr>
        <td>Value</td>
        <td>
            <p>The value in a key/value pair may be one of several data types:</p>
            <ul>
                <li>String</li>
                <li>Hash</li>
                <li>List</li>
                <li>Set</li>
                <li>Sorted set</li>
            </ul>
        </td> 
    </tr>
    <tr>
        <td>Redis-compatible API</td>
        <td>
            <p>DynomiteDB supports a Redis-compatible API which means that you can use any Redis client in your favorite programming language.</p>
        </td> 
    </tr>
</table>

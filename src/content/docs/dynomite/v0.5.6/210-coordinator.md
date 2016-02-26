---
title: "Coordinator"
slug: "coordinator"
date: "2016-02-18T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.6"
type: "dynomite-v0.5.6"
docurl: "/docs/dynomite/v0.5.6/"
docsection: "Servers and nodes"
weight: 810
draft: false

---

The coordinator is a per request role that involves receiving a request from a client, communicating the request with one or more replica nodes, receiving responses from the replica nodes, and finally sending a response to the client. 

A client (typically an API server) may contact any node within the DynomiteDB cluster for any given request. This means that any node may act as the coordinator for any given request. Further, this means that the coordinator is not a centralized function, it is not a specialized server and it is not a single point of failure.

The workflow of the coordinator is as follows:

1. Receive a request from a client
2. Hash the key portion of the request's key/value pair using a consistent hashing algorithm to obtain a data token
3. Use the node's knowledge of the network topology and the data token to determine which node owns the requested key/value pair
4. Query the requested data
    - If consistency level (CL) = `DC_ONE` and the coordinator's node owns the requested data token, then:
        - Forward the request to the node's Redis backend
        - Receive a response from the Redis backend
        - Go to step #6 below
    - If consistency level (CL) = `DC_ONE` and a remote node owns the requested data token, then:
        - Asynchronously forward the request to the remote node that owns the data token
        - The remote node then forwards the request to its Redis backend
        - The remote node receives a response from its Redis backend and then forwards the response to the coordinator
        - Go to step #6 below
    - If consistency level (CL) = `DC_QUORUM` and the coordinator's node owns the requested data token, then:
        - Forward the request to the coordinator node's Redis backend and asynchronously forward the request to enough remote nodes that own the data token to satisfy the quorum 
        - Receive a response from the coordinator node's Redis backend and wait until the coordinator receives a response from each remote node
        - Go to step #6 below
    - If consistency level (CL) = `DC_QUORUM` and only remote nodes own the requested data token, then:
        - Asynchronously forward the request to enough remote nodes that own the data token to satisfy the quorum 
        - Wait until the coordinator receives a response from each remote node
        - Go to step #6 below
6. Send a response to the client
    - If consistency level (CL) = DC_ONE, then the coordinator sends the response to the client
    - If consistency level (CL) = DC_QUORUM, then:
        - If enough nodes responded with a success status to satisfy the quorum, then send a success response to the client
        - If a majority of the nodes responded with a failure status, then send a failure response to the client

# Data token via consistent hashing

The coordinator hashes the key portion of the key/value pair sent in the request. The key is hashed using a consistent hashing algorithm that yields a value from 0 to 4,294,967,295. 

The coordinator then uses the data token, the consistency level, the replication factor, and its knowledge of the network topology route the request to the node or nodes that own the requested data.

# Summary

The coordinator is a per request role that can be performed by any node. Each client request may be coordinated by a different node. The coordinator has no single point of failure (SPOF). 

The client driver determines which node will coordinate each request. The Dyno client is topology aware and can therefore route each request to a node that owns the requested data token

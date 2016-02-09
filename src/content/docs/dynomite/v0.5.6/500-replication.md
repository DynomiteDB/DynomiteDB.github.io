---
title: "Replication"
slug: "replication"
date: "2016-02-07T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.6"
type: "dynomite-v0.5.6"
docurl: "/docs/dynomite/v0.5.6/"
weight: 500

---

A client can connect to any node on a Dynomite cluster when sending write traffic. If the Dynomite node happens to own the data based on its token, then the data is written to the local datastore server process and asynchronously replicated to other racks in the cluster across all data centers. If the node does not own the data, it acts as a coordinator and sends the write to the node owning the data in the same rack. It also replicates the writes to the corresponding nodes in other racks and DCs.

The diagram below shows an example where data is being written to the cluster by the client. It belongs on nodes a2,b2,c2 and d2 as per the partitioning scheme. The request is sent to a1 which acts as the coordinator and sends the request to the appropriate datastore nodes.

<img class="img-responsive center-block"
     src="/img/dynomite/v0.5.6/cross-dc-replication.png"
     alt="Cross data center (DC) replication">

Dynomite features a regular, consistent hash ring. Replication is asymmetric. When a key is hashed to the ring, its owner is the node proceeding it in the ring. As shown in the graphic below, key 30 belongs to node 1 and key 200 belongs to node 4. 

<img class="img-responsive center-block"
     style="width: 75%;"
     src="/img/dynomite/v0.5.6/token-ownership.png"
     alt="Token ownership">

Local writes with the Dyno client employ token aware load balancing. The Dyno client is aware of the cluster topology of Dynomite within the same region, and hence can write directly to a specific node using consistent hashing. 

<img class="img-responsive center-block"
     style="width: 75%;"
     src="/img/dynomite/v0.5.6/topology-aware-load-balancing.png"
     alt="Dyno token aware load balancing">

Below, the Dyno client does a local write only (i.e local region) and the dynomite co-ordinator know its corresponding replica in the remote region and forwards on the write.

<img class="img-responsive center-block"
     src="/img/dynomite/v0.5.6/topology-aware-local-writes.png"
     alt="Dyno writes to local DC">

Asymmetric replication looks slightly different. At some point in the future we could have another region where the capacity is different from the current regions. For example, assume that we have m2.4xl instances in us-east-1 and we have a 6 node token ring in vus-east-1. Then assume that in eu-west-1 we have only m2.2xl instances, hence we have a 12 node token ring in eu-west-1.

In this scenario, key 30 goes to node 1 in us-east-1 but it goes to node 2 in eu-west-1. The Dyno client in each region is aware of the cluster topology and Dynomite is aware of all the topologies for remote regions (via gossip). By design, the client and server and respectively route the write to the correct set of nodes in both regions. 

<img class="img-responsive center-block"
     src="/img/dynomite/v0.5.6/topology-aware-multi-dc-local-writes.png"
     alt="Dyno writes to local DC in multi-DC environment">

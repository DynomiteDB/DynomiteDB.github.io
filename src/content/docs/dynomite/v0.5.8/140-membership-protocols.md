---
title: "Membership Protocols"
slug: "membership-protocols"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.8"
type: "dynomite-v0.5.8"
docurl: "/docs/dynomite/v0.5.8/"
docsection: "Architecture"
weight: 700
draft: false

---

Dynomite supports 2 methods to maintain a node's membership status:

## 1.) Centralized membership system

Each dynomite node will periodically reach out to a local service (a proxy to the centralized service) to obtain the cluster members. For more information, please look at this code: https://github.com/Netflix/dynomite/blob/master/src/seedsprovider/dyn_florida.c#L13

## 2.) Gossip

Gossip is disabled by default and can be turned on by providing "-g" flag on the command line. Each node maintains a data structure on the rest of the cluster topology and periodically pick a random node to spread out its data. Note that in using this you still need to provide a seed list for each node. https://www.cs.cornell.edu/~asdas/research/dsn02-swim.pdf

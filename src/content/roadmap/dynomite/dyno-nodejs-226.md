---
title: "Dyno Node.js"
description: "Create a Dyno Node.js client"
date: "2016-02-11T08:08:08-08:00"
draft: false
project: "Dyno"
timeframe: "Mid-term"
featurecategory: "client"
featurestatus: "New"
issueurls: 
  - "https://github.com/Netflix/dynomite/issues/226"
weight: 1

---

Create a Dyno Node.js client

## Impact

Node.js users would gain the following functionality:

- Topology aware request routing
- Routing including dual-write and avoiding nodes with downtime pending
- Connection pooling
- Automatic failover
- Ability to recycle unhealthy connections
- Retry policies including exponential backoff
- Connection pool metrics

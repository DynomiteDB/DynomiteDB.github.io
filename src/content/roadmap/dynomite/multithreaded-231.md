---
title: "Multithreaded Dynomite"
description: "Switch Dynomite from single threaded to multi-threaded"
date: "2016-02-11T08:08:08-08:00"
draft: false
project: "Dynomite"
timeframe: "Long-term"
featurecategory: "core"
featurestatus: "New"
issueurls: 
  - "https://github.com/Netflix/dynomite/issues/231"
weight: 1

---

Change Dynomite to a multi-threaded model:

- A master thread performs all setup tasks, then spawns `n` number of worker threads where `n` = # of cores available
- Each worker thread services client requests

## Impact

- Reduce time that messages spend waiting in queue 

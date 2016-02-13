---
title: "Docs - node tokens"
description: "Document token uniqueness requirements and tokens in general"
date: "2016-02-11T08:08:08-08:00"
draft: false
project: "Dynomite"
timeframe: "Short-term"
featurecategory: "docs"
featurestatus: "New"
issueurls: 
  - "https://github.com/Netflix/dynomite/issues/248"
  - "https://github.com/Netflix/dynomite/issues/191"
weight: 1

---

A Dynomite node's token must be unique within its rack. This fact needs to be added to the Dynomite documentation.

The way the token calculation works is that we take the max int (4294967295) and divide out to the number of nodes.

## Impact

Helps users learn Dynomite.

---
title: "Compress internode communication"
description: "Add feature to compress internode communication"
date: "2016-02-11T08:08:08-08:00"
draft: false
project: "Dynomite"
timeframe: "Long-term"
featurecategory: "core"
featurestatus: "New"
issueurls: 
  - "https://github.com/Netflix/dynomite/issues/232"
weight: 1

---

## Description

Add a configurable option to compress Dynomite to Dynomite communication.

## Impact

- Reduce bandwidth utilized for Dynomite to Dynomite communication
- Would increase Dynomite CPU utilization for non-serving tasks (i.e. compression consumes CPU)

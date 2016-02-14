---
title: "Round robin epoll connections"
description: "epoll unfairness in connections leads to latency in some cases"
date: "2016-02-11T08:08:08-08:00"
draft: false
project: "Dynomite"
timeframe: "Mid-term"
featurecategory: "core"
featurestatus: "New"
issueurls: 
  - "https://github.com/Netflix/dynomite/issues/257"
weight: 1

---

## Description

Dynomite is not fair in handling connections. This is due to unfairness in how epoll handles connections.

## Impact

Increased latency

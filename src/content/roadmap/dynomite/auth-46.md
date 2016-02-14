---
title: "Support Redis AUTH command"
description: "Add support for AUTH"
date: "2016-02-11T08:08:08-08:00"
draft: false
project: "Dynomite"
timeframe: "Long-term"
featurecategory: "core"
featurestatus: "New"
issueurls: 
  - "https://github.com/Netflix/dynomite/issues/46"
weight: 1

---

## Description

Add support for the `AUTH` command.

## Impact

Negligible impact. While `AUTH` provides some security, it's weak security. It's probably better that we document and recommend a more secure approach, such as running on a secure network.

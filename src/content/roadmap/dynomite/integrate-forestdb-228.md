---
title: "Integrate ForestDB as a backend"
description: "Add support for ForestDB to allow cache larger than RAM"
date: "2016-02-11T08:08:08-08:00"
draft: false
project: "Dynomite"
timeframe: "Mid-term"
featurecategory: "backend"
featurestatus: "New"
issueurls: 
  - "https://github.com/Netflix/dynomite/issues/228"
weight: 1

---

## Description

Add support for ForestDB as a backend.

## Impact

- Users can support cache larger than available RAM
- Users can choose to keep entire cache in memory, or a subset in memory with remainder on disk

---
title: "alloc_msgs_max"
slug: "alloc_msgs_max"
date: "2016-06-16T20:22:33-08:00"
product: "Debugging"
version: "v1.0.0"
type: "debugging-v1.0.0"
docurl: "/docs/debugging/v1.0.0/"
weight: 50
docsection: "Logs"
draft: false

---

The following log message indicates that the allocated buffer size is set to `0`. When this occurs, Dynomite will allow peer requests but will reject client request.

```bash
allocated #msgs 0 hit max allowable limit
```

# Causes

The above error / condition occurs when the allocated buffer size is not properly set when `dynomite` is started. This most frequently occurs when running `dynomite` on a Mac.

Another cause of this condition is when the DynomiteDB cluster is running on a slow network combined with a high volume of traffic. When this occurs, `dynomite` protects itself by rejecting new client connnections.

# Solution

A solution to the above issue is to start `dynomite` with the `-M` flag set to a value greater than or equal to `200000`.

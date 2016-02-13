---
title: "Convert build to Bazel"
description: "Switch from autotools to Bazel"
date: "2016-02-11T08:08:08-08:00"
draft: false
project: "Dynomite"
timeframe: "Long-term"
featurecategory: "build"
featurestatus: "New"
issueurls: 
  - "https://github.com/Netflix/dynomite/issues/230"
weight: 1

---

We are exploring the possibility of changing from autotools to Bazel.

## Impact

- Provide support for multi-language builds
- Would lose the ability to `./configure` and `make install`

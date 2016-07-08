---
title: "Integer"
slug: "integer"
date: "2016-05-15T20:22:33-08:00"
product: "KeyValueAPI"
version: "v0.5.8"
type: "key-value-api-v0.5.8"
docurl: "/docs/key-value-api/v0.5.8/"
weight: 102
docsection: "Data types"
draft: false

---

<img class="img-responsive center-block"
     style="width: 55%;"
     src="/img/kv-api/integer.svg"
     alt="Integer data type">

<p class="dyno-image-caption text-center">Integer data type</p>

The **String** data type can store **Integer** values. An **Integer** can be increased in value via the `INCR` command and decreased in value via the `DECR` command.

You can increment and decrement an **Integer** by specific values using the `INCRBY` and `DECRBY` commands.

The **String** data type with an **Integer** value is most often used for counting.

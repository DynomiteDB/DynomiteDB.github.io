---
title: "List"
slug: "list"
date: "2016-05-16T20:22:33-08:00"
product: "KeyValueAPI"
version: "v0.5.8"
type: "key-value-api-v0.5.8"
docurl: "/docs/key-value-api/v0.5.8/"
weight: 104
docsection: "Data types"
draft: false

---

<img class="img-responsive center-block"
     style="width: 55%;"
     src="/img/kv-api/list.svg"
     alt="List data type">

<p class="dyno-image-caption text-center">List data type</p>

The **List** data type is an insertion ordered sequence of strings. It is implemented as a doubly linked list which means that you have high performance push and pop operations to the beginning and end of the list.

## Introduction to List commands

You add new elements to the beginning of a list with `LPUSH`, or list push. And you can read and remove an element from the beginning of a list with `LPOP`.

There are equivalent commands for the right side, or end of a list, via `RPUSH` and `RPOP`.

The two most widely used list range commands are `LRANGE`, which allows you to get a subset of the list elements, and `LTRIM` which allows you to limit the size of the list. `LTRIM` is useful when you require a fixed list size, such as the 10 most recent blog posts.

The fact that a list is insertion ordered means that it is ideal for tracking lists of recent items, such as recent blog posts or recent signups in a lead generation form.

Lists also work exceptionally well for social media streams and message queues.

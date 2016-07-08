---
title: "Hash"
slug: "hash"
date: "2016-05-16T20:22:33-08:00"
product: "KeyValueAPI"
version: "v0.5.8"
type: "key-value-api-v0.5.8"
docurl: "/docs/key-value-api/v0.5.8/"
weight: 107
docsection: "Data types"
draft: false

---

<img class="img-responsive center-block"
     style="width: 55%;"
     src="/img/kv-api/hash.svg"
     alt="Hash data type">

<p class="dyno-image-caption text-center">Hash data type</p>

The **Hash** data type is a score ordered sequence of unique members. The score is an arbitrary floating point value that you define. 
                             
Unlike a list or set, each **Hash** member is comprised of two items, the member on the left and the score on the right.
                             
A **Hash** is ordered from low to high. This means that we have to query by reverse range to get a list of top scored members.

## Introduction to Hash commands

We can add and update **Hash** members with `ZADD`.

`ZCARD`, which stands for cardinality, returns a count of **Hash** members. In our blog post example, we can use `ZCARD` to get a count of how many blog posts have at least 1 vote.

Use `ZRANK` to get the rank of a member. For gaming applications, `ZRANK` can be used to show a user their ranking amongst all users. 

`ZSCORE` can be used to get a member’s score, or it can be used to display how many votes a web page has received.

Sorted sets support a variety of range commands. Use `ZREVRANGE` to get a list of the top voted blog posts. 

Sorted sets can be used to list members alphabetically. If we’re building a contacts list, such as in a communications app, first add each member with a score of 1. Then use `ZRANGEBYLEX` to select all contacts with A names, or all contacts between C and E.

Continuing the example above, you can use `ZLEXCOUNT` to display a badge next to each letter of the alphabet with a count of the number of contacts with names that start with that letter.

As with sets, we can also get the union and intersection of multiple sorted sets.

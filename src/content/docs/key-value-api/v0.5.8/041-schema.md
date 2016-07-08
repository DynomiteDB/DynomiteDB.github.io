---
title: "Schema"
slug: "schema"
date: "2016-05-15T20:22:33-08:00"
product: "KeyValueAPI"
version: "v0.5.8"
type: "key-value-api-v0.5.8"
docurl: "/docs/key-value-api/v0.5.8/"
weight: 75
docsection: "Data modeling"
draft: false

---

DynomiteDB uses a Redis-compatible API which means that all keys are stored in a single, flat monolithic namespace.

A properly designed schema is just as important when using DynomiteDB as it is with any other database. However, with DynomiteDB the entire schema is defined by properly named keys.

## Schema basics

In DynomiteDB you define your schema using a colon `:` delimited sequence of entities and values in the key. As with all data modeling, the first step in defining a schema in DynomiteDB is to understand the various entities (such as `user`, or `company`, or `message`) that is used by your application. The primary entity should be the first element in the key.

### Defining a schema

We are going to define a schema for DynomiteDB by comparing to the example SQL below.
 
```sql
SELECT name, email
FROM user
WHERE id = 7 
```

<p class="dyno-image-caption text-center">SQL select statement</p>

In the example above, the primary entity is `user`, which is used as the table name. Therefore, we will begin the key name as `user:` (remember that `:` is used as a delimiter).

Next, the SQL above uses the `WHERE` clause to select a specific row within the table. We will use a similar syntax to define the key, which is now `user:id=7`. 

Our key of `user:id=7` now clearly communicates that the associated value is for a user with an id of 7.

### Multiple filters

A key with multiple filters can be created by adding additional `attribute=value` conditions to the key name. It is recommended that you follow the rules below to ensure that your schema follows a well defined pattern:

1. List the primary key immediately after the entity.
2. Sort all additional filter conditions alphabetically.

For example, if we need to store a value for a user with id = 7, nationality = "US" and email = "bob@example.com", then we would create the key as follows:

`user:id=7:email=bob@example.com:nationality=US`

---
title: "Data types"
slug: "data-types"
date: "2016-05-15T20:22:33-08:00"
product: "KeyValueAPI"
version: "v0.5.8"
type: "key-value-api-v0.5.8"
docurl: "/docs/key-value-api/v0.5.8/"
weight: 100
docsection: "Data types"
draft: false

---

DynomiteDB supports a variety of data types, including:

- String
- List
- Set
- Sorted Set
- Hash

The String type is used to support several sub-types including Integer, Float and Bitmap.

# String

<strong>String</strong> is an ordered sequence of non-unique bytes. String is binary safe and more closely resembles a byte array than a string literal.

- [Learn more about Strings](../string)
- [Learn more about Integers](../integer)
- [Learn more about Floats](../float)

# List

<strong>List</strong> is an insertion ordered, non-unique sequence of strings. It is implemented as a doubly-linked list and supports fast head and tail operations.

- [Learn more about Lists](../list)

# Set

<strong>Set</strong> is an unordered, unique collection of strings. It is similar to a mathematical set and supports common set operations including union, intersection and difference.

- [Learn more about Sets](../set)

# Sorted Set

<strong>Sorted Set</strong> is a score ordered sequence of unique strings. Each item in a Sorted Set is comprised of two components, the member and a score. The member is a string value, while the score is an arbitrary float value that you define.  

- [Learn more about Sorted Sets](../sorted-set)

# Hash

<strong>Hash</strong> is an unordered collection of unique field/value pairs. It is similar to a relational database row, a flat unnested document in a document database, or a hash map provided by various programming languages.

- [Learn more about Hashes](../hash)

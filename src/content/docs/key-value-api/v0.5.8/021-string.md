---
title: "String"
slug: "string"
date: "2016-05-15T20:22:33-08:00"
product: "KeyValueAPI"
version: "v0.5.8"
type: "key-value-api-v0.5.8"
docurl: "/docs/key-value-api/v0.5.8/"
weight: 101
docsection: "Data types"
draft: false

---

<img class="img-responsive center-block"
     style="width: 55%;"
     src="/img/kv-api/string.svg"
     alt="String data type">

<p class="dyno-image-caption text-center">String data type</p>

A **String** is an ordered sequence of bytes, not a string literal. Think of strings as an indexed array of bytes.

This means that you can store arbitrary data in a string, such as a string literal, an integer, or a float. You can also serialize JSON to a string or binary format and then store it in a string.

## Introduction to String commands

You can `SET` and `GET` a string. A `SET` writes the string to the database and a `GET` returns the string. As with all data types, you access a string via its key.

You can `APPEND` to the end of a string and get the length of a string via `STRLEN`.

The fact that a string acts like an indexed array of bytes means that you can access substrings. `SETRANGE` allows you to overwrite a substring while `GETRANGE` allows you to query a substring.

The ability to append to a string combined with reading and writing substrings allows you to use a string for compact data storage.

Strings are often used for more than simple key/value storage. You can also use a string to store a serialized object or database row.

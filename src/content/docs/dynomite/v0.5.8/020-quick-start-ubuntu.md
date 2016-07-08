---
title: "Quick Start (Ubuntu)"
slug: "quick-start-ubuntu"
date: "2016-03-27T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.8"
type: "dynomite-v0.5.8"
docurl: "/docs/dynomite/v0.5.8/"
weight: 101
docsection: "Introduction"
draft: false

---

In this quick start we will setup a single node cluster on Ubuntu.

The DynomiteDB package automatically installs and configures Dynomite with a Redis backend in a single server configuration.

# Install DynomiteDB

First, get the DynomiteDB gpg key.

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FB3291D9
```

Add the DynomiteDB repository to your list of apt repositories.

```bash
sudo add-apt-repository "deb https://apt.dynomitedb.com/ trusty main"

sudo apt-get update
```

Install DynomiteDB.

```
sudo apt-get install -y dynomitedb
```

Congrats, DynomiteDB is now installed. You can now start to use DynomiteDB via the `redis-cli` client. Alternatively, you can use your favorite programming language and preferred Redis client driver.

# Start Dynomite and the Redis backend

Our next step is to start a backend and the Dynomite server. We'll start with the Redis backend.

> Only one backend should be running per node.

Start the Redis server with the command below.

```bash
sudo service dynomitedb-redis start
```

Next, start the Dynomite server.

```bash
sudo service dynomite start
```

# Connect to Redis

Connect directly to Redis to ensure that Redis is working properly.

```bash
redis-cli -p 22122
```

Enter the following commands at the `redis-cli` prompt. Expected output is shown below each command.

Create a key named `fname`.

```bash
set fname "Bob"
```

Create a key named `lname`.

```bash
set lname "Smith"
```

Get the value of `fname`.

```bash
get fname

Expected output: "Bob"
```

Get the value of `lname`.

```bash
get lname

Expected output: "Smith"
```

Exit the Redis prompt.

```bash
quit
```

# Connect to Dynomite

Next, connect to Dynomite.

```bash
redis-cli -p 8102
```

Enter the following commands at the `redis-cli` prompt which is now connected to Dynomite.

Each of the commands below are sent from the `redis-cli` client to the `dynomite` server which then forwards the request to the `redis-server` backend.

Get the value of `fname`.

```bash
get fname

Expected output: "Bob"
```

Get the value of `lname`.

```bash
get lname

Expected output: "Smith"
```

Change the value of `fname`.

```bash
set fname "Bill"
```

Get the new value of `fname`.

```bash
get fname

Expected output: "Bill"
```

Exit the Redis prompt.

```bash
quit
```

Congratulations. You have successfully installed DynomiteDB in a single node configuration.

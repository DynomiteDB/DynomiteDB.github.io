---
title: "Quick Start (Docker)"
slug: "quick-start"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.7"
type: "dynomite-v0.5.7"
docurl: "/docs/dynomite/v0.5.7/"
weight: 100
docsection: "Introduction"
draft: false

---

In this quick start we will setup a single node cluster using Docker. Setup requires 3 steps:

- Create the `dynomitedb_net` network
- Run the `backend-redis` container
- Run the `dynomite` container

DynomiteDB automatically configures the `dynomite` and `backend-redis` containers to run as a single server cluster.

# Install Docker

> You must install Docker before running the commands below.

Mac and Windows users should follow the Docker installation instructions on Docker.com.

Ubuntu 14.04 users may install Docker using the <a href="/docs/dynomite/v0.5.7/install-docker-ubuntu-14-04/">Install Docker on Ubuntu 14.04</a> instructions.

# Networking

Create a bridge network named `dynomitedb_net`. The `dynomite` server and the Redis backend (`backend-redis`) will communicate over this network.

```bash
docker network create -d bridge --subnet=192.168.6.0/24 --gateway=192.168.6.1 dynomitedb_net
```

# Run the `dynomite-backend-redis` and `dynomite` containers.

Run the `backend-redis` container.

```bash
docker run --name backend-redis -h redis.dynomitedb.net --ip=192.168.6.20 --net=dynomitedb_net --add-host dynomite.dynomitedb.net:192.168.6.10 -d dynomitedb/backend-redis
```

Run the `dynomite` container.

```bash
docker run --name dynomite -h dynomite.dynomitedb.net --ip=192.168.6.10 --net=dynomitedb_net --add-host redis.dynomitedb.net:192.168.6.20 -d dynomitedb/dynomite
```

## Run the client tools container to test

```bash
docker run -it --rm --ip=192.168.6.30 --net=dynomitedb_net --add-host dynomite.dynomitedb.net:192.168.6.10 --add-host redis.dynomitedb.net:192.168.6.20 redis:2.8.23 bash
```

Test network connectivity from the tools container to the Dynomite container.

```bash
ping -c 3 dynomite.dynomitedb.net
```

Test network connectivity from the tools container to the Redis container.

```bash
ping -c 3 redis.dynomitedb.net
```

Connect directly to the Redis container to ensure that Redis is working properly.

```bash
redis-cli -h redis.dynomitedb.net -p 6379
```

Enter the following commands at the `redis-cli` prompt. Expected output is shown below each command.

```bash
redis.dynomitedb.net:6379> set fname "Bob"
OK
redis.dynomitedb.net:6379> set lname "Smith"
OK
redis.dynomitedb.net:6379> get fname
"Bob"
redis.dynomitedb.net:6379> get lname
"Smith"
redis.dynomitedb.net:6379> quit
```

Next, connect to the Dynomite container.

```bash
redis-cli -h dynomite.dynomitedb.net -p 8102
```

Enter the following commands at the `redis-cli` prompt. Expected output is shown below each command.

Each of the commands below are sent from the `redis-cli` client to the `dynomite` server which then forwards the request to the `redis-server` backend.

```bash
dynomite.dynomitedb.net:8102> get fname
"Bob"
dynomite.dynomitedb.net:8102> get lname
"Smith"
dynomite.dynomitedb.net:8102> set fname "Bill"
OK
dynomite.dynomitedb.net:8102> get fname
"Bill"
dynomite.dynomitedb.net:8102> quit
```

Exit the tools container.

```bash
exit
```

Stop the `dynomite` and `backend-redis` containers.

```bash
docker stop $(docker ps -aq)
```

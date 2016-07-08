---
title: "Quick Start (Docker)"
slug: "quick-start"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.8"
type: "dynomite-v0.5.8"
docurl: "/docs/dynomite/v0.5.8/"
weight: 100
docsection: "Introduction"
draft: false

---

In this quick start we will setup a single node cluster using Docker. Setup requires 2 steps:

- Run the `backend-redis` container
- Run the `dynomite` container

DynomiteDB automatically configures the `dynomite` and `backend-redis` containers to run as a single server cluster.

# Install Docker

> You must install Docker before running the commands below.

Mac and Windows users should follow the Docker installation instructions on Docker.com.

Ubuntu 14.04 users may install Docker using the <a href="/docs/dynomite/v0.5.8/install-docker-ubuntu-14-04/">Install Docker on Ubuntu 14.04</a> instructions.

# Run the `dynomite-backend-redis` and `dynomite` containers.

Run the `backend-redis` container.

```bash
docker run --name backend-redis --net="host" -p 22122:22122 -d dynomitedb/redis
```

Run the `dynomite` container.

```bash
docker run --name dynomite --net="host" -p 8101:8101 -p 8102:8102 -d dynomitedb/dynomite
```

## Run the client tools container to test

```bash
docker run --name redis-tools --net="host" -it --rm dynomitedb/redis /bin/bash
```

Connect directly to the Redis container to ensure that Redis is working properly.

> The `redis-cli` commands below are run in the container named `redis-tools` that you started above.

```bash
redis-cli -h localhost -p 22122
```

Enter the following commands at the `redis-cli` prompt. Expected output is shown below each command.

```bash
localhost:22122> set fname "Bob"
OK
localhost:22122> set lname "Smith"
OK
localhost:22122> get fname
"Bob"
localhost:22122> get lname
"Smith"
localhost:22122> quit
```

Next, connect to the Dynomite container.

```bash
redis-cli -h localhost -p 8102
```

Enter the following commands at the `redis-cli` prompt. Expected output is shown below each command.

Each of the commands below are sent from the `redis-cli` client to the `dynomite` server which then forwards the request to the `redis-server` backend.

```bash
localhost:22122> get fname
"Bob"
localhost:22122> get lname
"Smith"
localhost:22122> set fname "Bill"
OK
localhost:22122> get fname
"Bill"
localhost:22122> quit
```

Exit the tools container.

```bash
exit
```

Stop the `dynomite` and `backend-redis` containers.

```bash
docker stop $(docker ps -aq)
```

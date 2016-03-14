---
title: "dynomite.conf"
slug: "dynomite-conf"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.7"
type: "dynomite-v0.5.7"
docurl: "/docs/dynomite/v0.5.7/"
docsection: "Configuration"
weight: 910
draft: true

---

TODO

1. Add `daemonize` to the conf file
2. Add `output` to the conf file
3. Add `pid-file` to the conf file


# datacenter

The data center (DC) name that contains this node's server.

# rack

The name of the rack that contains this node's server.

# listen



# dyn_listen

# dyn_port

# dyn_seeds

Array of seeds provided as `ip-address:port:rack:dc:token`

# dyn_seed_provider

# dyn_connections

# dyn_read_timeout

# dyn_write_timeout

# hash

# hash_tag

# distribution

# timeout

# backlog

# client_connections

# data_store

# preconnect

# auto_eject_hosts

# server_connections

# server_retry_timeout

# server_failure_limit

# servers

Backend servers, such as Redis.

```bash
hostname:port:weight
ip:port:weight
```

# tokens

The node token owned by the node.

DOES THIS WORK? An array of tokens owned by the server.

# gos_interval

# secure_server_option

# pem_key_file

The SSL public certificate (`.pem`) file used by Dynomite for secure node to node communication.

# env



# conn_msg_rate

# read_consistency

# write_consistency

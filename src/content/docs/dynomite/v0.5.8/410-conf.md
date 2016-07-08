---
title: "dynomite.yaml"
slug: "dynomite-yaml"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.8"
type: "dynomite-v0.5.8"
docurl: "/docs/dynomite/v0.5.8/"
docsection: "Configuration"
weight: 910
draft: false

---
<!--
TODO
1. Add `daemonize` to the conf file
2. Add `output` to the conf file
3. Add `pid-file` to the conf file
-->

The `dynomite.yaml` file supports many configuration options. Each option is described below along with default values and possible values.

# datacenter
  
- Default value: `localdc`

<!--
- Default value (dyno CLI): none (in single server mode), `dc1` (in cluster mode)
- Environment variable: `DYNOMITE_DC`
-->

The name of the data center (DC) that this node is contained within. Do not set a value for `datacenter` when running in single server mode. In cluster mode, set `datacenter` to the name of the data center, such as `dc1`.

# rack

- Default value: `localrack`

<!--
- Default value (dyno CLI): none (in single server mode), `rack1` (in cluster mode)
- Environment variable: `DYNOMITE_RACK`
-->

The name of the rack that contains this node's server. Do not set a value for `rack` when running in single server mode. In cluster mode, set `rack` to the name of the node's rack, such as `rack1`.

# listen

- Default value: none

<!--
- Default value (dyno CLI): `0.0.0.0:8102`
- Environment variable: `DYNOMITE_LISTEN`
-->

`listen` is a string value that defines the hostname (or IP address) and port that Dynomite will listen on for incoming RESP requests. This defines the port that a Redis client will use to connect to Dynomite.

The default `dynomite.yaml` file sets the value of `listen` to `127.0.0.1:8102` which causes Dynomite to listen for incoming RESP requests on port 8102 on the loopback device.

Set `listen` to `0.0.0.0:8102` if you want to listen on all IP addresses used by the server.

Best practice is to set `listen` to the private IP address of the server to prevent external access to the Dynomite cluster.

# dyn_listen

- Default value: none

<!--
- Default value: `0.0.0.0:8101`
- Environment variable: `DYNOMITE_DYN_LISTEN`
-->

`dyn_listen` is a string value that contains the hostname (or IP address) and port that Dynomite will use to communicate with other Dynomite nodes within the cluster.
 
Best practice is to set `dyn_listen` to the private IP address of the server to prevent external access to the Dynomite cluster.

# dyn_port

- Default value: `8101`

<!--
- Environment variable: `DYNOMITE_DYN_PORT`
-->

The port used by `dynomite` for node-to-node communication including gossip. You will usually leave `dyn_port` undefined since the port will be set via `dyn_listen`.

# dyn_seeds
 
- Default value: none

<!--
- Environment variable: `DYNOMITE_DYN_SEEDS`

This is an optional env var. It can be empty or a string (which is then parsed into an array).

When a value is passed it must use ":" to separate items within each array index, and use "|" to separate array indexes.
-->

`dyn_seeds` is an array of seeds provided as `ip-address:port:rack:dc:token`. Each seed must be listed on a separate line in the `dynomite.yaml` file.

# dyn_seed_provider

- Default value: `simple_provider`

<!--
- Default value: none if single server, else `simple_provider`
- Environment variable: `DYNOMITE_DYN_SEED_PROVIDER`
-->

Possible values:

- `simple_provider`: Define the seeds manually in the `dynomite.conf` file.
- `florida_provider`: Use the Dynomite manager to provide the seeds.
- `dns_provider`: Use the DNS provider.

Use the default value of none for `dyn_seed_provider` when running Dynomite in a single server configuration. 

# dyn_connections

- Default value: none

<!--
- Environment variable: `DYNOMITE_DYN_CONNECTIONS`
-->

<!-- TODO -->

# dyn_read_timeout

- Default value: `10000`

<!--
- Environment variable: `DYNOMITE_DYN_READ_TIMEOUT`
-->

The number of milliseconds before reads between Dynomite nodes timeout.

# dyn_write_timeout

- Default value: `10000`

<!--
- Environment variable: `DYNOMITE_DYN_WRITE_TIMEOUT`
-->

The number of milliseconds before writes between Dynomite nodes timeout.

# hash

- Default value: murmur

<!--
- Environment variable: `DYNOMITE_HASH`
-->

The hash algorithm to use when hashing a key.

Possible values:

- one_at_a_time
- md5
- crc16
- crc32
- crc32a
- fnv1_64
- fnv1a_64
- fnv1_32
- fnv1a_32
- hsieh
- murmur
- jenkins
- murmur3

# hash_tag

- Default value: none

<!--
- Environment variable: `DYNOMITE_HASH_TAG`
-->

The hash tag is a string that defines delimiters that cause the key hash to only use the portion of the key specified by the hash tag. In other words, Dynomite will only consider a substring within each key when generating a hash of the key.

`hash_tag` provides you with the ability to map multiple keys to the same server.

You must also define a value for `distribution` when using `hash_tag`.

# distribution

- Default value: `vnode`

<!--
- Environment variable: `DYNOMITE_DISTRIBUTION`
-->

Possible values:

- ketama
- modula
- random
- vnode
- single

`distribution` defines how hashed keys are distributed across Dynomite nodes.

# timeout

- Default value: `5000`

<!--
- Environment variable: `DYNOMITE_TIMEOUT`
-->

Timeout specified in milliseconds.

# backlog

- Default value: `512`

<!--
- Environment variable: `DYNOMITE_BACKLOG`
-->

On Linux, `backlog` defines the maximum length to which the queue of pending connections may grow. A connection request that arrives after the queue is full may receive an `ECONNREFUSED` error. `backlog` is set to the smaller of `backlog` or `/proc/sys/net/core/somaxconn`.

On BSD, `backlog` defines the maximum length to which the queue of pending connections may grow.  The real maximum queue length will be 1.5 times more than the value specified in the `backlog` argument. A connection request that arrives after the queue is full may receive an `ECONNREFUSED` error or a TCP connection may be silently dropped.

# client_connections

- Default value: none

<!--
- Environment variable: `DYNOMITE_CLIENT_CONNECTIONS`
-->

Defines the maximum number of client connections.

# data_store

- Default value: `0`

<!--
- Environment variable: `DYNOMITE_DATA_STORE`
-->

`data_store` supports two possible values:

- `0`: RESP compatible server (such as Redis or a persistent DynomiteDB backend)
- `1`: Memcached

Use an integer value of `0` or `1` in the `dynomite.yaml` file.

<!--
However, you must specify the backend by name when using the `DYNOMITE_DATA_STORE` environment variable. `DYNOMITE_DATA_STORE` supports the following values:

- Redis (converted to `0` in `dynomite.yaml` by the `dyno` CLI)
- Memcached (converted to `1` in `dynomite.yaml` by the `dyno` CLI)
- RocksDB (converted to `0` in `dynomite.yaml` by the `dyno` CLI)
- LMDB (converted to `0` in `dynomite.yaml` by the `dyno` CLI)
-->

# preconnect

- Default value: `true`

<!--
- Environment variable: `DYNOMITE_PRECONNECT`
-->

By default, `dynomite` will preconnect to the backend server. Set `preconnect` to `false` to prevent `dynomite` from preconnecting to the backend server or servers in the pool.

# auto_eject_hosts

- Default value: `true`
- Best practice: `true`

<!--
- Environment variable: `DYNOMITE_AUTO_EJECT_HOSTS`

Set `auto_eject_hosts` to `true` to allow Dynomite to remove (i.e. eject) a node from the cluster after `server_failure_limit` consecutive failures.

Importantly, a node will only be temporarily removed from the cluster when `server_retry_timeout` is a positive integer value. This allows a node with temporary failures to rejoin the cluster.

# server_connections

- Default value: `1`
- Best practice: `1`

<!--
- Environment variable: `DYNOMITE_SERVER_CONNECTIONS`
-->

`server_connections` determines how many connections the `dynomite` server opens to a backend server, such as Redis or a persistent DynomiteDB backend.

Setting `server_connections` to a value greater than 1 removes the the ability of each `dynomite` process to guarantee read after write. This guarantee is when `server_connections` >= 1 as multiple backend connections may result in the read and write being sent to different connections which then causes a race condition.

# server_retry_timeout
 
- Default value: `10000`
- Best practice: `30000`

<!--
- Environment variable: `DYNOMITE_SERVER_RETRY_TIMEOUT`
-->

Set `server_retry_timeout` to a positive integer value to allow a previously ejected node to rejoin the cluster after `server_retry_timeout` milliseconds.

# server_failure_limit

- Default value: `2`
- Best practice: `3`

<!--
- Environment variable: `DYNOMITE_SERVER_FAILURE_LIMIT`
-->

<!-- TODO: SET A DEFAULT VALUE OF 3. Ref: https://github.com/Netflix/dynomite/blob/39aa98994650c55819c94cc43f42ddb77d5a4015/notes/recommendation.md -->

`server_failure_limit` is used in conjunction with `auto_eject_hosts` to determine the number of consecutive failures after which a node is ejected from the cluster.

# servers

- Default value: `127.0.0.1:22122:1`

<!--
- Environment variable: `DYNOMITE_BACKEND`
-->

`servers` defines the backend server in the form of `backend-host:backend-port:weight`. The backend may be a Redis, RocksDB, LMDB or other backend server supported by DynomiteDB.

The backend server should be located on the same VM or physical server as the `dynomite` process. When DynomiteDB is run on Kubernetes then the backend container should be located in the same pod as the `dynomite` container.

# tokens
 
- Default value: none

<!--
- Environment variable: `DYNOMITE_TOKENS`
-->

`tokens` is used to set the node token which defines the range of data tokens owned by the node.

The default formula to define a node token is shown below. `numberOfNodesInRack` is the number of nodes contained within a rack (availability zone on AWS) and `nodeIndex` is the zero-based index of the node.

```bash
nodeToken = (4294967295 / numberOfNodesInRack) * nodeIndex
```

For example, if a rack (AZ) has 3 nodes, then the node token for each node is shown below.

```bash
nodeToken1 = (4294967295 / 3) * 0 = 0

nodeToken2 = (4294967295 / 3) * 1 = 1431655765

nodeToken3 = (4294967295 / 3) * 2 = 2863311530
```

# gos_interval

- Default value: none

<!--
- Environment variable: `DYNOMITE_GOS_INTERVAL`
-->

Sets the amount of time in milliseconds to sleep at the end of a gossip round. 

# secure_server_option

- Default value: none
- Best practice: Depends on security requirements

<!--
- Environment variable: `DYNOMITE_SECURE_SERVER_OPTION`
-->

`secure_server_option` determines which node-to-node communication will be encrypted.

`secure_server_option` supports four possible values:

- `none`: Do not encrypt communication between nodes.
- `datacenter`: Only encrypt communication between nodes that are in different DCs. Communication between nodes within the same DC is unencrypted.
- `rack`: Encrypt communication between nodes in different racks and between nodes across DCs. Do not encrypt communication between nodes within the same rack within a DC.
- `all`: Encrypt all communication between nodes. This is the most secure choice. However, it degrades performance the most.

# pem_key_file

- Default value: `/etc/dynomitedb/dynomite/dynomite.pem`

<!--
- Environment variable: `DYNOMITE_PEM_KEY_FILE`
-->

The SSL public certificate (`.pem`) file used by Dynomite for secure node-to-node communication.

`pem_key_file` must specify the full path to the SSL `.pem` file that is used to encrypt communication between Dynomite nodes.

# env

- Default value: `aws`

<!--
- Environment variable: `DYNOMITE_ENV`
->

The possible values for `env` are:

- `aws`: Indicates that Dynomite is installed on AWS.
- `google`: Indicates that Dynomite is installed on GCE.
- `network`: Indicates that Dynomite is installed in a data center that you control.

# conn_msg_rate

- Default value: `50000`

<!--
- Environment variable: `DYNOMITE_CONN_MSG_RATE`
-->

Defines the default number of messages per second. 

# read_consistency

- Default value: `dc_one`

<!--
- Environment variable: `DYNOMITE_READ_CONSISTENCY`
-->

> CL = Consistency Level, so ReadCL = Read Consistency Level

`read_consistency` has two possible values:

- `dc_one`: During a read request, one replica node must successfully respond to the coordinator with the requested data in order for the overall request to succeed.
- `dc_quorum`: During a read request, a quorum (i.e. simple majority) of replica nodes must successfully respond to the coordinator with the requested data in order for the overall request to succeed.

# write_consistency (default: dc_one)

- Default value: `dc_one`

<!--
- Environment variable: `DYNOMITE_WRITE_CONSISTENCY`
-->

`write_consistency` has two possible values:

- `dc_one`: During a write request, the coordinator synchronously writes to one replica node and asynchronously to other replica nodes. Only one replica node must successfully acknowledge the write request in order for the overall request to succeed. 
- `dc_quorum`: During a write request, the coordinator synchronously writes to a quorum (i.e. simple majority) of replica nodes and asynchronously to other replica nodes. A quorum of replica nodes must successfully acknowledge the write request in order for the overall request to succeed.

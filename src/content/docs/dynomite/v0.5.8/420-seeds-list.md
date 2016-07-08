---
title: "seeds.list"
slug: "seeds-list"
date: "2016-03-14T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.8"
type: "dynomite-v0.5.8"
docurl: "/docs/dynomite/v0.5.8/"
docsection: "Configuration"
weight: 920
draft: false

---

The `seeds.list` contains a list of seed servers that Dynomite's gossiper uses as the starting point to learn the cluster's topology.

`seeds.list` is used by the seed REST API server (`florida.js`) when `dyn_seed_provider` is set to `florida_provider` in `dynomite.yaml`.

`seeds.list` is one of three possible ways that you may specify the list of seed servers.

The choices for seed providers are:

- **Simple provider**: The simple provider either defines the list of seed servers in `dynomite.yaml` or excludes the list of seed servers for a single-server cluster. 
- **Florida provider**: The Florida provider defines the seed servers in `seeds.list` and shares the list via a REST API.
- **DNS provider**: The DNS provider defines the seed servers in a `TXT` record.

It is a best practice to use the same three seed servers on every node within a data center (DC).

The default location of `seeds.list` is `/etc/dynomitedb/seeds.list`.

# Format

The `seeds.list` file lists one seed server per line. Each line has the following format:

`<hostname-or-ip>:<dyn-port>:<rack>:<dc>:<node-token>`

- hostname-or-ip: The hostname or IP address of a seed server that is used by Dynomite for internal communication. Set in `dynomite.yaml` via `dyn_listen`.
- dyn-port: The port used by Dynomite for internal communication. Defaults to `8101` and is set in `dynomite.yaml` via `dyn_listen`.
- rack: The seed server's rack. Set in `dynomite.yaml` via `rack`.
- dc: The seed server's data center (DC). Set in `dynomite.yaml` via `datacenter`.
- node-token: The seed server's node token. Set in `dynomite.yaml` via `tokens`.

# Example

The following example shows three seed servers. The first seed server has the following values:

- ip: 192.168.33.41
- port: 8101
- rack: rc1
- dc: dc1
- node token: 2147483647

```bash
192.168.33.41:8101:rc1:dc1:2147483647
192.168.33.42:8101:rc2:dc1:0
192.168.33.43:8101:rc2:dc1:2147483647
```

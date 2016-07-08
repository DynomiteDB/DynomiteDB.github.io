---
title: "DO NOT PUBLISH"
slug: "do-not-publish"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.7"
type: "dynomite-v0.5.7"
docurl: "/docs/dynomite/v0.5.7/"
docsection: "Data"
weight: 910
draft: true

---

DELETE THIS AFTER FINISHING THE 410-conf DOCUMENTATION:

Parse and generate the `dynomite.yaml` file. The current implementation gets the dynomite configuration from environment variables and uses these variables to determine which `dynomite.yaml` to generate.

# `dynomite.yaml` variations

1. Single server (i.e. a development only installation)
2. Cluster with single DC
    a. List seeds in `dynomite.yaml`
    b. Use Florida
3. Cluster with multi-DC
    a. List seeds in `dynomite.yaml`
    b. Use Florida

Importantly, the single DC and multi-DC configurations are very similar, which will be explained below.

## Single server (aka single node)

The following logic describes how to configure a single server `dynomite.yaml` file.

```bash
#
# The if condition below should also include if these env vars are not set as
# DYNOMITE_CLUSTER_TYPE == "single-node" && DYNOMITE_DATA_STORE = "Redis" are 
# the default values (which means that a user does not have to set these values)
#
IF DYNOMITE_CLUSTER_TYPE == "single-node" && DYNOMITE_DATA_STORE = "Redis" OR
   DYNOMITE_CLUSTER_TYPE == "single-node" && DYNOMITE_DATA_STORE is not set OR
   DYNOMITE_CLUSTER_TYPE is not set && DYNOMITE_DATA_STORE = "Redis" OR,
   DYNOMITE_CLUSTER_TYPE is not set && DYNOMITE_DATA_STORE = is not set,
THEN this is a single server configuration with a Redis backend

    # Set default values for the following variables.
    .DynListen = "0.0.0.0:8101"
    .Listen = "0.0.0.0:8102"
    .DynSeedProvider = "simple_provider"
    .Backend = "redis.dynomitedb.net:6369"
    .Token = 0
    .PemKeyFile = "/etc/dynomitedb/dynomite.pem"
    .DataStore = 0

END IF
```

The single node template should be based on the example shown below. 

```yaml
dyn_o_mite:
  dyn_listen: {.DynListen}
  listen: {.Listen}
  dyn_seed_provider: {.DynSeedProvider} 
  servers:
  - {.Backend}:1
  tokens: {.Token}
  pem_key_file: {.PemKeyFile}
  data_store: {.DataStore}
```

Beyond the default values, the following environment variables can be used to customize the values of a single node `dynomite.yaml` file.

- `DYNOMITE_DYN_LISTEN`: Variable in template = `{.DynListen}`
- `DYNOMITE_LISTEN`: Variable in template = `{.Listen}`
- `DYNOMITE_DYN_SEED_PROVIDER`: Variable in template = `{.DynSeedProvider}` 
- `DYNOMITE_BACKEND`: Variable in template = `{.Backend}:1` (notice how you must append `:1`)
- `DYNOMITE_TOKENS`: Variable in template = `{.Token}`
- `DYNOMITE_PEM_KEY_FILE`: Variable in template = `{.PemKeyFile}`
- `DYNOMITE_DATA_STORE`: Variable in template = `{.DataStore}`

## Single DC

A single DC cluster is a cluster where all racks and servers are within the same DC.

The following logic determines if we should generate the configuration for a single DC.

```bash
IF DYNOMITE_CLUSTER_TYPE = "single-dc"
THEN

    # Set default values for the following variables.
    .DC = "dc1"                                  # NEW VARIABLE
    .Rack = "rack1"                              # NEW VARIABLE
    .DynListen = "0.0.0.0:8101"                  # Same as single node
    .Listen = "0.0.0.0:8102"                     # Same as single node
    .DynSeeds = empty slice                      # OPTIONAL: NEW VARIABLE
    .DynSeedProvider = "simple_provider"         # OPTIONAL: DIFFERENT
    .Backend = "redis.dynomitedb.net:6369"       # Same as single node
    .Token = nil                                 # DIFFERENT, DEFAULT TO nil
    .PemKeyFile = "/etc/dynomitedb/dynomite.pem" # Same as single node
    .DataStore = 0                               # Same as single node

END IF
```

The single DC template should be based on the example shown below. The single DC template differs from the single node template by adding the following options:

- `datacenter`
- `rack`
- `dyn_seeds` or `dyn_seed_provider`
- `secure_server_option`

```yaml
dyn_o_mite:
  datacenter: {.DC}
  rack: {.Rack}
  dyn_listen: {.DynListen}
  {if not .DynSeedProvider}
  dyn_seeds:
  - FOR EACH {.DynSeeds}
  {/if}
  {if .DynSeedProvider}
  dyn_seed_provider: {.DynSeedProvider}
  {/if}
  listen: {.Listen}
  servers:
  - {.Backend}:1
  tokens: '{.Token}'
  secure_server_option: datacenter
  pem_key_file: {.PemKeyFile}
  data_store: {.DataStore}
```

The following environment variables can be used to customize the values used to generate the `dynomite.yaml` file.

- `DYNOMITE_DC`: Variable in template = `{.DC}` `[NEW]`
- `DYNOMITE_Rack`: Variable in template = `{.Rack}` `[NEW]`
- `DYNOMITE_DYN_LISTEN`: Variable in template = `{.DynListen}`
- `DYNOMITE_LISTEN`: Variable in template = `{.Listen}`
- `DYNOMITE_DYN_SEEDS`: Variable in template = `{.DynSeeds}` 
- `DYNOMITE_DYN_SEED_PROVIDER`: Variable in template = `{.DynSeedProvider}` 
- `DYNOMITE_BACKEND`: Variable in template = `{.Backend}:1` (notice how you must append `:1`)
- `DYNOMITE_TOKENS`: Variable in template = `{.Token}`
- `DYNOMITE_SECURE_SERVER_OPTION`: Variable in template = {.SecureServerOption} `[NEW]`
- `DYNOMITE_PEM_KEY_FILE`: Variable in template = `{.PemKeyFile}`
- `DYNOMITE_DATA_STORE`: Variable in template = `{.DataStore}`


## Multi-DC

A multi-DC `dynomite.yaml` file follows the exact same logic as the `single-dc` option.

# Environment variables

The `dyno-conf` command accepts the following environment variables.

> When I write "if nodes = 1" this means if DYNOMITE_CLUSTER_TYPE = "single-node".

## DYNOMITE_CLUSTER_TYPE (default: single-node) {.ClusterType}

`DYNOMITE_CLUSTER_TYPE` has 3 possible values:
- `single-node`: Create a single server (i.e. development) configuration file. 
- `single-dc`: Indicates that the configuration file is for a single DC where all nodes reside within the same DC.
- `multi-dc`: Indicates that the configuration file is for a large, multi-DC cluster. 

```bash
if DYNOMITE_CLUSTER_TYPE == "single-node" && DYNOMITE_DATA_STORE = "Redis" OR
   DYNOMITE_CLUSTER_TYPE == "single-node" && DYNOMITE_DATA_STORE is not set, then
        # Set the default values 
        .DynListen = "0.0.0.0:8101"
        .DataStore = 0
        .Listen = "0.0.0.0:8102"
        .DynSeedProvider = "simple_provider"
        .Backend = "redis.dynomitedb.net:6369"
        .Token = 0

end if

...

Get the environment variable for each of the variables with default values. 

If the environment variable is set, then override the default value.
```

## DYNOMITE_NODE_INDEX (default: 1)

What is this node's index (using a 1 based index). The 3rd node in a rack
will use DYNOMITE_NODE_INDEX = 3.

## DYNOMITE_NODES_IN_RACK (default: 1)

How may nodes are in the rack specified by `DYNOMITE_RACK`.

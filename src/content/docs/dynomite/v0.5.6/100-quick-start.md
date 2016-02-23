---
title: "Quick Start"
slug: "quick-start"
date: "2016-02-07T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.6"
type: "dynomite-v0.5.6"
docurl: "/docs/dynomite/v0.5.6/"
weight: 100
draft: false

---

In this setup, we will use Redis with Dynomite. For Memcached, it is very similar replacing Redis installation step with Memcached installation step. We will also show you the configurations to simulate a one-node Dynomite cluster and a two-node Dynomite cluster.

## Install Redis

Please follow the instructions on this website to download and install Redis: http://redis.io/

## Build Dynomite

Please follow our [README.md](https://github.com/Netflix/dynomite/blob/master/README.md) to compile and build Dynomite from source. Note that we only test Dynomite on Linux environments so we recommend compiling and building Dynomite on a Linux system.

## Configure a one-node cluster

These examples are for redis. If you remove redis property, they will become memcached configured files.

### One node cluster

```bash
https://github.com/Netflix/dynomite/blob/master/conf/dyn_redis_single.yml  
```

### Two-nodes cluster in one datacenter with 2 racks

```bash
https://github.com/Netflix/dynomite/blob/master/conf/dyn_redis_dc1_rack1.yml

https://github.com/Netflix/dynomite/blob/master/conf/dyn_redis_dc1_rack2.yml
```

### Two-nodes cluster in two datacenters each having one rack

```bash
https://github.com/Netflix/dynomite/blob/master/conf/dyn_redis_mul_dc1.yml

https://github.com/Netflix/dynomite/blob/master/conf/dyn_redis_mul_dc2.yml
```

### 6-node cluster in one datacenter with 3 racks, each having 2 nodes

```bash
dyn_o_mite:
     datacenter: us-east-1
     dyn_listen: 0.0.0.0:9101
     dyn_seed_provider: simple_provider
     dyn_seeds:
     - ec2-54-162-161-10.compute-1.amazonaws.com:9101:rack-v0:us-east-1:1383429731
     - ec2-54-191-177-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:1383429731
     - ec2-54-181-51-12.compute-1.amazonaws.com:9101:rack-v1:us-east-1:3530913378
     - ec2-54-129-121-134.compute-1.amazonaws.com:9101:rack-v0:us-east-1:3530913378
     - ec2-23-123-53-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:3530913378
     listen: 0.0.0.0:9102
     servers:
     - 127.0.0.1:6380:1
     timeout: 30000
     tokens: '1383429731'
     rack: rack-v1
     data_store: 0
```

```bash
dyn_o_mite:
     datacenter: us-east-1
     dyn_listen: 0.0.0.0:9101
     dyn_seed_provider: simple_provider
     dyn_seeds:
     - ec2-54-111-131-14.compute-1.amazonaws.com:9101:rack-v1:us-east-1:1383429731
     - ec2-54-191-177-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:1383429731
     - ec2-23-123-53-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:3530913378
     - ec2-54-129-121-134.compute-1.amazonaws.com:9101:rack-v0:us-east-1:3530913378
     - ec2-54-181-51-12.compute-1.amazonaws.com:9101:rack-v1:us-east-1:3530913378
     listen: 0.0.0.0:9102
     servers:
     - 127.0.0.1:6380:1
     timeout: 30000
     tokens: '1383429731'
     rack: rack-v0
     data_store: 0
```

```bash
dyn_o_mite:
     datacenter: us-east-1
     dyn_listen: 0.0.0.0:9101
     dyn_seed_provider: simple_provider
     dyn_seeds:
     - ec2-54-162-161-10.compute-1.amazonaws.com:9101:rack-v0:us-east-1:1383429731
     - ec2-54-111-131-14.compute-1.amazonaws.com:9101:rack-v1:us-east-1:1383429731
     - ec2-54-129-121-134.compute-1.amazonaws.com:9101:rack-v0:us-east-1:3530913378
     - ec2-23-123-53-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:3530913378
     - ec2-54-181-51-12.compute-1.amazonaws.com:9101:rack-v1:us-east-1:3530913378
     listen: 0.0.0.0:9102
     servers:
     - 127.0.0.1:6380:1
     timeout: 30000
     tokens: '1383429731'
     rack: rack-v2
     data_store: 0
```

```bash
dyn_o_mite:
     datacenter: us-east-1
     dyn_listen: 0.0.0.0:9101
     dyn_seed_provider: simple_provider
     dyn_seeds:
     - ec2-54-162-161-10.compute-1.amazonaws.com:9101:rack-v0:us-east-1:1383429731
     - ec2-54-191-177-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:1383429731
     - ec2-54-111-131-14.compute-1.amazonaws.com:9101:rack-v1:us-east-1:1383429731
     - ec2-23-123-53-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:3530913378
     - ec2-54-129-121-134.compute-1.amazonaws.com:9101:rack-v0:us-east-1:3530913378
     listen: 0.0.0.0:9102
     servers:
     - 127.0.0.1:6380:1
     timeout: 30000
     tokens: '3530913378'
     rack: rack-v1
     data_store: 0
```

```bash
dyn_o_mite:
     datacenter: us-east-1
     dyn_listen: 0.0.0.0:9101
     dyn_seed_provider: simple_provider
     dyn_seeds:
     - ec2-54-162-161-10.compute-1.amazonaws.com:9101:rack-v0:us-east-1:1383429731
     - ec2-54-111-131-14.compute-1.amazonaws.com:9101:rack-v1:us-east-1:1383429731
     - ec2-54-191-177-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:1383429731
     - ec2-54-181-51-12.compute-1.amazonaws.com:9101:rack-v1:us-east-1:3530913378
     - ec2-23-123-53-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:3530913378
     listen: 0.0.0.0:9102
     servers:
     - 127.0.0.1:6380:1
     timeout: 30000
     tokens: '3530913378'
     rack: rack-v0
     data_store: 0
```

```bash
dyn_o_mite:
     auto_eject_hosts: true
     datacenter: us-east-1
     dyn_listen: 0.0.0.0:9101
     dyn_seed_provider: simple_provider
     dyn_seeds:
     - ec2-54-111-131-14.compute-1.amazonaws.com:9101:rack-v1:us-east-1:1383429731
     - ec2-54-162-161-10.compute-1.amazonaws.com:9101:rack-v0:us-east-1:1383429731
     - ec2-54-191-177-122.compute-1.amazonaws.com:9101:rack-v2:us-east-1:1383429731
     - ec2-54-181-51-12.compute-1.amazonaws.com:9101:rack-v1:us-east-1:3530913378
     - ec2-54-129-121-134.compute-1.amazonaws.com:9101:rack-v0:us-east-1:3530913378
     listen: 0.0.0.0:9102
     servers:
     - 127.0.0.1:6380:1
     timeout: 30000
     tokens: '3530913378'
     rack: rack-v2
     data_store: 0
```

## Start the cluster

Assume you have gone through the build process and produced the binary file `dynomite`.

To run a one node dynomite cluster using the above config, you can run 

```bash
dynomite -c dynomite.yml
```

If you want to start a 2 node cluster with those two yaml files, you can open 2 terminals and run:
 
In the first terminal run the following:

```bash
dynomite -c dynomite1.yml
```

In the second terminal run the following:

```bash
dynomite -c dynomite2.yml
```

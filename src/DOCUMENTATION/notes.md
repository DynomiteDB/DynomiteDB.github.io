
# `dynomitemanager/src/main/java/com.netflix.dynomitemanager/`

## `sidecore/config/AwsInstanceDataRetriever.java`

Accesses AWS EC2 specific meta-data service at `http://169.254.169.254/latest/meta-data`. Queries for the following properties:

- getRac(): public-hostname
- getPublicHostname(): public-hostname
- getPublicIP(): public-ipv4
- getInstanceId(): instance-id
- getInstanceType(): instance-type


# Increase file descriptors for Redis backend

sudo vi /etc/default/dynomitedb-redis

Uncomment
ULIMIT=65536


On Dynomite node

# Dynomite admin API

The Dynomite admin API is accessible via http://localhost:22222 and should not be exposed externally (i.e. block port 22222 on the firewall).

# Get Dynomite stats

Get statistics.

Stats are described in: https://github.com/Netflix/dynomite/blob/dev/src/dyn_stats.h

```bash
curl http://localhost:22222/info
```

## View help

```bash
curl http://localhost:22222/help
```

# Ping the Dynomite server

```bash
curl http://localhost:22222/ping
```

```bash
OK
```

## TODO: NOT A COMMAND

```bash
curl http://localhost:22222/describe
```

```bash
OK
```

## Increase log verbosity

```bash
curl http://localhost:22222/loglevelup
```

```bash
OK
```

## Decrease log verbosity

```bash
curl http://localhost:22222/logleveldown
```

```bash
OK
```

## 

```bash
curl http://localhost:22222/historeset
```

```bash

## Get the current cluster topology

```bash
curl http://localhost:22222/cluster_describe
```

```json
{  
  "dcs":[  
    {  
      "name":"dc1",
      "racks":[  
        {  
          "name":"rack1",
          "servers":[  
            {  
              "name":"10.0.1.34",
              "host":"10.0.1.34",
              "port":8101,
              "token":0,

            },
            {  
              "name":"10.0.1.163",
              "host":"10.0.1.163",
              "port":8101,
              "token":1431655765,

            },
            {  
              "name":"10.0.1.112",
              "host":"10.0.1.112",
              "port":8101,
              "token":2863311530,

            }
          ]
        }
      ]
    }
  ]
}
```

# Get the current Read CL and Write CL

```bash
curl http://localhost:22222/get_consistency
```

```bash
Read Consistency: DC_ONE
Write Consistency: DC_ONE
```

## 

Set the consistency via a GET request.

```bash
curl http://localhost:22222/set_consistency/read|write/dc_one|dc_quorum
```

## 

```bash
curl http://localhost:22222/get_timeout_factor
```

## 

```bash
curl http://localhost:22222/set_timeout_factor
```

## 

```bash
curl http://localhost:22222/peer/up
```

## 

```bash
curl http://localhost:22222/peer/down
```

## 

```bash
curl http://localhost:22222/peer/reset
```

## Change Dynomite to standby state

`standby` causes Dynomite to drop all read and write requests. An error is returned to the client.

```bash
curl http://localhost:22222/state/standby
```

## Change Dynomite into read-only mode

Change Dynomite to a **read-only** state. Write requests are allowed. Read requests will fail with an error.

<!-- dyn_client.c -->

```bash
curl http://localhost:22222/state/writes_only
```

```bash
OK
```

## Change Dynomite into normal state

Return Dynomite to the `normal` state to accept  read and write requests.

```bash
curl http://localhost:22222/state/normal
```

```bash
OK
```

## Change Dynomite to resuming mode

`resuming` is a temporary state during which time read requests are dropped and all queued write requests are flushed / written. 

```bash
curl http://localhost:22222/state/resuming
```

```bash
OK
```

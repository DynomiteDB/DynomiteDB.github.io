---
title: "Consistency"
slug: "consistency"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.7"
type: "dynomite-v0.5.7"
docurl: "/docs/dynomite/v0.5.7/"
docsection: "Architecture"
weight: 600
draft: false

---

DynomiteDB allows you to tune the amount of consistency in your cluster. DynomiteDB's tunable consistency supports both eventual consistency and immediate consistency within the local data center (DC). The consistency level is set on a cluster-wide basis for both reads and writes.

Tunable consistency means that you can choose between eventual consistency which optimizes for high performance, high availability and high throughput vs. immediate consistency within the local DC which optimizes for data consistency. The downside to eventual consistency is the potential for stale reads, while the downside to immediate consistency are higher latency and lower availability.

> Dynomite added support for tunable consistency in version 0.5.3. 

# Consistency level (CL)

Consistency level (CL) determines how many nodes must acknowledge a given read or write request. Consistency level is tunable on a cluster-wide basis and defaults to `DC_ONE`.

DynomiteDB supports two consistency levels:

- DC_ONE
- DC_QUORUM

CL = `DC_ONE` provides the best performance, lowest latency, highest availability and highest throughput at the expense of a few milliseconds of eventual consistency. However, if your application requires immediate consistency within the local DC then you should use CL = `DC_QUORUM`.

Consistency level on write requests controls how many replicas must acknowledge that they received and wrote the key/value pair. Consistency level on read requests controls how many replicas must acknowledge the request by sending their most recent copy of the key/value pair to the coordinator.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>Consistency level</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>DC_ONE</td>
        <td>
            <ul>
                <li>When CL = <code>DC_ONE</code> the coordinator contacts one replica node that is located within the same rack as the coordinator. It succeeds when the one replica node successfully replies to the coordinator.</li>
                <li>CL = <code>DC_ONE</code> has the lowest consistency, highest availability, highest throughput and prevents synchronous cross DC traffic.</li>
                <li>Write requests with CL = <code>DC_ONE</code> are synchronously written to one replica node within the same rack as the coordinator and asynchronously replicated to replica nodes located in other racks and DCs.</li>
                <li>Read requests with CL = <code>DC_ONE</code> are synchronously read from one replica node within the same rack as the coordinator.</li>
            </ul>
        </td> 
    </tr>
    <tr>
        <td>DC_QUORUM</td>
        <td>
            <ul>
                <li>A request with CL = <code>DC_QUORUM</code> succeeds when a majority of the replica nodes located in the local DC successfully reply to the coordinator. <code>DC_QUORUM</code> only contacts replica nodes located in the local DC.</li>
                <li>CL = <code>DC_QUORUM</code> has balanced consistency and availability, and prevents synchronous cross DC traffic.</li>
                <li>CL = <code>DC_QUORUM</code> provides immediate consistency within the local DC and eventual consistency across remote DCs.</li>
                <li>Write requests with CL = <code>DC_QUORUM</code> are synchronously written to a quorum of replica nodes within the local DC (i.e. the same DC as the coordinator) and asynchronously replicated to replica nodes located in other racks and DCs.</li>
                <li>Read requests with CL = <code>DC_QUORUM</code> are synchronously read from a quorum of replica nodes within the local DC (i.e. the same DC as the coordinator).</li>
                <li>Quorum is calculated as <code>roundDown( (numberOfReplicas / 2) + 1 )</code>.</li>
            </ul>
        </td> 
    </tr>
</table>

## Consistency level (CL) configuration

You can configure the consistency level (CL) for reads and writes separately. The two types of CL configuration are:

- Read CL
- Write CL

The read and write CL can be configured in two ways:

- statically in the `dynomite.yaml` file
- dynamically at runtime via teh admin port

### dynomite.yaml

You can configure the read CL and write CL in `dynomite.yaml` via the `read_consistency` and `write_consistency` keys. The possible values for each of the CL keys are `dc_one` (the default) and `dc_quorum`.

> The `dynomite.yaml` is read once by `dynomite` during startup.

```bash
dyn_o_mite:
  ...
  read_consistency: dc_quorum
  write_consistency: dc_quorum
```

### Admin port

You can configure the read CL without restarting `dynomite` via the admin port. By default, the admin port is set to `22222`.

```bash
curl http://localhost:22222/set_consistency/read/dc_quorum
```

As with the read CL above, you can set the write CL using the admin port.

```bash
curl http://localhost:22222/set_consistency/write/dc_quorum
```

### View the current consistency level (CL)

You can view the current read CL and write CL configuration via the admin port as shown below.

```bash
curl http://localhost:22222/get_consistency
```

The `curl` command above will display the current CLs as follows:

```bash
Read Consistency: DC_QUORUM
Write Consistency: DC_QUORUM
```

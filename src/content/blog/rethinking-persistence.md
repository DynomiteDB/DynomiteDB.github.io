---
title: "Rethinking data persistence in the cloud"
description: "Is disk persistent?"
date: "2016-10-03T17:35:08-08:00"
draft: false
author: "Akbar S. Ahmed"
authors:
  - "Akbar S. Ahmed"
email: "akbar@dynomitedb.com"
categories:
  - "Cloud"
tags:
  - "Cloud"

---

Changing our understanding of data persistence and ephemerality is one of the most difficult tasks when moving to the cloud. In the data center, writing data to disk means that it will still be there after power cycling a server. But is this still true in the cloud?

<!--more-->

## Challenging common knowledge

It is common knowledge that writing data to disk means that it is persistent. In other words, once data has been written to disk, we can reboot or power cycle the machine with no loss of data.

The fact that disk is persistent has been true for decades. It was true long before laptops were created and it has continued to be true as spinning disks gave way to SSD drives.

> It ain't what you don't know that gets you into trouble. It's what you know for sure that just ain't so.<br/><br/>Mark Twain

However, in the age of cloud-based server instances, does writing data to disk mean that it is persistent?

## Disk persistence in the cloud

A cloud server instance is a virtual machine that is allocated local disk while the instance exists. A reboot is part of the active lifespan of an instance. So, when an instance is rebooted, the instance exists and therefore the data on disk exists. 

However, when an instance is terminated, it no longer exists and the local disk is freed. The result is that terminating an instance results the deletion of the local disk and all data on it.

Therefore, our previous common knowledge about disk persistence no longer holds true in the cloud. The following table summarizes disk persistence in the cloud.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th class="col-md-1"></th>
        <th>Disk persistence</th>
    </tr>
    <tr>
        <td><strong>Reboot</strong></td>
        <td><span class="label label-success">Persistent</span></td>
    </tr>
    <tr>
        <td><strong>Termination</strong></td>
        <td><span class="label label-danger">Ephemeral</span></td>
    </tr>
</table>

## Memory in the cloud

Traditional memory has not changed in the cloud environment. Both a reboot and termination result in data deletion as shown in the table below.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th class="col-md-1"></th>
        <th>Memory persistence</th>
    </tr>
    <tr>
        <td><strong>Reboot</strong></td>
        <td><span class="label label-danger">Ephemeral</span></td>
    </tr>
    <tr>
        <td><strong>Termination</strong></td>
        <td><span class="label label-danger">Ephemeral</span></td>
    </tr>
</table>

### What about logged memory?

Another option for cloud native applications is to use logged memory. Logged memory maintains an on-disk log file (such as an append only file) that records each update to memory. 

With logged memory, in-memory data structures are restored during a reboot by reading the log and replaying each command. As a result, logged memory has similar persistence to disk. 

In other words, data in memory is persistent across reboots by replaying the log file, while instance termination results in data deletion.

The table below summarizes the persistence of logged memory in cloud environments.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th class="col-md-1"></th>
        <th>Logged memory persistence</th>
    </tr>
    <tr>
        <td><strong>Reboot</strong></td>
        <td><span class="label label-success">Persistent</span></td>
    </tr>
    <tr>
        <td><strong>Termination</strong></td>
        <td><span class="label label-danger">Ephemeral</span></td>
    </tr>
</table>

## Reboot vs. termination

Before moving forward, one important point is that cloud server instances are rarely rebooted. The more common instance lifespan is to run non-stop until terminated.

The fact that cloud instances are rarely rebooted makes disk, logged memory and memory look similar. However, they are not the same.

Disk and logged memory both write data to disk and therefore can be backed up to persistent, object storage, such as Amazon's S3. Further, data can be restored from S3 for both disk and logged memory.

## Summary

In conclusion, long held knowledge must be reassessed when moving to the cloud. 

In the cloud, disk is not persistent. Logged memory and disk are both persistent across reboots and ephemeral at termination.

The implications of cloud persistence and ephemerality should carefully evaluated when developing cloud native applications.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th class="col-md-1"></th>
        <th>Disk</th>
        <th>Logged memory</th>
        <th>Memory</th>
    </tr>
    <tr>
        <td><strong>Reboot</strong></td>
        <td><span class="label label-success">Persistent</span></td>
        <td><span class="label label-success">Persistent</span></td>
        <td><span class="label label-danger">Ephemeral</span></td>
    </tr>
    <tr>
        <td><strong>Termination</strong></td>
        <td><span class="label label-danger">Ephemeral</span></td>
        <td><span class="label label-danger">Ephemeral</span></td>
        <td><span class="label label-danger">Ephemeral</span></td>
    </tr>
</table>

The fact that the disk on an individual node is ephemeral does not mean that your database is ephemeral. Further, an application that uses logged memory can achieve similar persistence to disk.
 
In the cloud, a persistent database is comprised of ephemeral nodes. The following are some best practices when deploying a cloud native database:

1. Use multiple data centers to ensure a live copy of data is always online
2. Use database orchestration to automate data backup and recovery
3. Backup to persistent object storage (such as S3)
4. Maintain an offline backup (i.e. backup S3 to an offline format stored in another facility)
5. Choose carefully between disk and logged memory as the tradeoffs are different from a data center 

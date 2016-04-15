---
title: "Docker containers"
description: "A high-level introduction to Docker containers for experienced engineers"
date: "2016-04-13T08:08:08-08:00"
draft: false
author: "Akbar S. Ahmed"
authors:
  - "Akbar S. Ahmed"
email: "akbar@dynomitedb.com"
categories:
  - "Docker"
tags:
  - "DynomiteDB"
  - "Docker"
  - "containers"

---

The following is a high-level introduction of Docker containers for experienced engineers. It is assumed that you have a conceptual understanding of virtualization (both system-level and OS-level), environments and other basic Linux concepts. The goal of this document is provide a quick, practical overview of containers so that you can make informed choices when architecting your container strategy.

The current generation of container technologies trace their recent linage to “process containers” which were invented in 2006 by Google engineers Paul Manage and Rohit Seth. Process containers were renamed to control groups (aka cgroups) in 2007 as the term container was already used in multiple contexts within the Linux kernel. In 2013, Docker re-introduced the term container when referring to the combination of cgroups, namespaces and a union filesystem.

## Containers are not lightweight VMs

With the rise in Docker’s popularity, technical bloggers started to describe containers as “lightweight VMs” as a shortcut to teaching people about containers. However, this explanation causes more harm than good. It is true that VMs and containers are both a form of virtualization. However, VMs provide system-level virtualization. In simple terms, VMs virtualize an entire computer system including virtualized hardware and a complete operating system.

The original term “process containers” provide a better explanation of Docker containers than “lightweight VMs”. First, containers provide operating system-level virtualization, not system level virtualization. OS-level virtualization is a kernel feature that delivers process isolation inside of an operating system.

Let’s drive home the difference between VMs (system-level virtualization) and containers (OS-level virtualization) with an example using ulimit. In our example, we have two hosts, hostA and hostB.

hostA contains two VMs, vmA and vmB. Next, let’s execute ulimit in each of hostA, vmA and vmB as follows:

- hostA: ulimit -Sn 100
- vm1: ulimit -Sn 200
- vm2: ulimit -Sn 150

Executing ulimit as defined above results in different limits on hostA, vm1 and vm2. Why? Each of hostA, vm1 and vm2 have their own kernel.

Next, let’s continue our example with containers. hostB contains two containers, containerA and containerB. We now execute ulimit in each of hostB, containerA and containerB as follows:

- hostB: ulimit -Sn 100
- container1: ulimit -Sn 200
- container2: ulimit -Sn 150

Executing ulimit as defined results in the same limits on hostB, container1 and container2. Why? Each of hostB, container1 and container2 all share hostB’s kernel.

In summary, containers provide limited process isolation via cgroups, namespaces, networking and a union filesystem. Next, we’ll discuss container use case categories.

## Container use cases

There are three use case categories for containers. Each use case category delivers unique benefits and should be evaluated independently of the other use cases. In other words, you may use containers within one part of your development workflow without impacting other parts of your software development process. The use case categories are:

- Development environment
- Build environment
- Runtime environments
    - Product demo
    - Testing
    - Production deployment

Each of the three workflows are discussed in detail below.

### Development environment

Container use within the development workflow is low risk and is one of the most common uses of Docker. The benefit of using containers for development is that it eases the burden of installing and configuring the development environment for each developer. Another benefit is that users of various OSs can all develop within a common environment. For example, Mac and Windows users can develop Dynomite in a lightweight Ubuntu based container without the need for a heavyweight VM.

However, the downside of a completely uniform development environment is that small bugs due to library version differences or slight environment differences may go unnoticed. This problem should be taken seriously when compiled software will not be deployed in a container and will therefore run in heterogeneous environments.

A compromise approach may be to provide developers with a core development container that each engineer can then modify, thus providing the benefit of rapid development environment setup combined with heterogeneity.

### Build environment

Container use for building software is perhaps the highest value use case. First, the use of containers with properly implemented UnionFS layers provides repeatable builds using known dependencies.

Second, and equally important, archiving a Docker build container is easy. The ability to store build environments in an archive means that production bugs can be traced all the way back to the build environment, in case the build proves to be the source of error.

### Runtime environments

Docker containers may be used in three distinct runtime environments:
- Product demos
- Testing
- Production

#### Product demos

Use of containers as a product demo environment is currently widespread. It is also a low risk approach to allowing users to install, run and experience your software with a minimum of friction. Container use for product demos is strongly recommended.

#### Testing

The use of containers within test environments is powerful. First, a large number of containers can be created with shared UnionFS layers for all but the top most layers. This allows organizations to run automated tests in a large number of slightly varied environments each with different versions of key shared objects, resource allocations/constraints and application configurations.

Testing containers, much like build containers, allow companies to archive a large number of test environments with minimal storage requirements. Bugs found in production can be reproduced in historical test environments, unit tests can be run in these test environments, and so on.

Overall, the use of containers within testing provides a number of significant benefits.

#### Production

Finally, let’s discuss container use within production deployments. Excluding Google’s decade of at-scale container use, there are few at-scale production deployments using Docker containers. However, it appears obvious that production use of containers is set to grow rapidly in the one to three year timeframe.

## Process isolation

As discussed in the introduction to this article, containers provide process isolation via OS-level virtualization.

In practical terms, containers provide limited isolation which means that a container provides the following environment that is separate from the host OS:

- A file system, starting from / (root)
- A separate namespace including /etc/passwd, /etc/group, clean process ID (PID) namespace, etc.
- A layered file system with mostly immutable layers
- Networking

A clean file system and separate namespace ensure that an application runs in a pristine environment, while networking allows a container to control which parts of a contained application are exposed to the host environment. A risk of this clean environment is that engineers may become careless by hard coding environmental assumptions into applications. The use of varied testing containers helps to mitigate this risk. The layered file system is comprised of mostly immutable layers. UnionFS and layers are extremely important and are discussed in more detail below.

The isolation provided by a container is limited. Most importantly, a container shares the host’s kernel which means that changes in the host’s kernel affect the container.

## Resource limits

An important feature of control groups (cgroups) is the ability to limit the resources (CPU, memory, IO and network) used by a container. Containers also allow a user to pin processes to one or more CPUs.

The ability to limit the resources used by a container is an often overlooked feature. Use of this feature is set to increase when enterprises begin to deploy containers at scale. Specifically, resource limits are vital input to orchestration frameworks as this information determines where to locate containers within a cluster, how to move containers and when to forcibly restart a container. Further, resource limits are used by orchestration frameworks and schedulers (i.e. Mesos) to maximize resource utilization.

Resource limits are most effective when each container runs a single process.

## UnionFS

Docker containers use a union file system that is comprised of multiple layers. Most of the layers within a UnionFS are immutable. An equally if not more important point is that layers are shared across multiple Docker images. For example, if we have two Docker images each with three layers as shown in the table below, then imageA and imageB share layer1 and layer2.

Image A and Image B share the “Common app dependencies” layer and the “Ubuntu 14.04.4” layer. 

The docker images command will show imageA = 225MB and imageB = 225MB for a total of 450MB. However, on disk the two shared layers are only 300MB, while the unique layers of imageA and imageB are a combined 50 MB. Therefore, Image A and Image B will only consume 350 MB on disk (200MB + 100MB + 25MB + 25MB).

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th>Size on disk</th>
        <th>imageA</th>
        <th>imageB</th>
    </tr>
    <tr>
        <td>25MB</td>
        <td>appA</td> 
        <td>appB</td> 
    </tr>
    <tr>
        <td>100MB</td>
        <td>Common app dependencies</td> 
        <td>Common app dependencies</td> 
    </tr>
    <tr>
        <td>200MB</td>
        <td>Ubuntu 14.04.4 layer</td> 
        <td>Ubuntu 14.04.4 layer</td> 
    </tr>
</table>

Importantly, the disk space savings from shared layers becomes increasingly important for development velocity, build speed and faster provisioning via an orchestration framework. The performance boost from shared layers is very evident when common layers are shared by multiple development, test and build containers.

Proper layer architecture is vitally important when containers are used at scale. The reuse of layers by multiple containers that are part of the same group (“pod” in Kubernetes parlance) allows an orchestration framework to more easily move containers within a cluster. Further, a good layer architecture minimizes network utilization substantially and reduces the amount of time required to deploy additional containers.

## Networking

By default, Docker containers use a Layer 2 (L2) overlay network. While Docker’s approach to networking has benefits, it poses problems at scale. Scalable, performance sensitive deployments of Docker, such as enterprise production use cases, need a higher performance alternative to Docker’s default networking.

Project Calico (https://www.projectcalico.org) provides a Layer 3 (L3) alternative to Docker’s L2 approach. Essentially, Project Calico implements a vRouter in the host’s kernel and eliminates the need for a vSwitch in each container along with the associated packet encapsulation.

DynomiteDB strongly recommends the use of Project Calico for container networking at scale and even more so for multi-DC deployments.

## Summary

Docker containers provide process isolation via OS-level virtualization. Containers isolate processes from the host environment via cgroups, a clean namespace, UnionFS and networking. Importantly, containers share the host's kernel.

There are four primary use case categories for containers:

- Development environment
- Build environment
- Runtime environments
    - Product demo
    - Testing
    - Production deployment

The lowest risk highest value use cases for containers are within the development environment, build environment and for product demos and testing. At scale production deployment of containers is currently rare.

The key to effective use of containers is to use them to isolate processes, to constrain resource utilization and to reuse layers within a UnionFS.

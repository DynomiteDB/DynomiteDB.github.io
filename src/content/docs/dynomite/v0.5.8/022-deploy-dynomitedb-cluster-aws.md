---
title: "Deploy DynomiteDB cluster on AWS"
slug: "deploy-dynomitedb-cluster-on-aws"
date: "2016-05-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.8"
type: "dynomite-v0.5.8"
docurl: "/docs/dynomite/v0.5.8/"
weight: 102
docsection: "Introduction"
draft: false

---

# AWS Identity and Access Management (IAM) 

> Not required, but good for managing resources as a team.

- 

# Create resource group

A resource group consolidates all DynomiteDB cluster resources into a single screen. All resources within a resource group share one or more tags.

- Click **Create a Group**.
- Enter the following information:
    - Group name: DynomiteDB Cluster
    - Tags: [key:value]
        - type:node
    - Regions: leave blank
    - Resource types: leave blank
- Click **Save**.

# Create VPC

<!-- ref: http://docs.aws.amazon.com/AmazonVPC/latest/GettingStartedGuide/getting-started-create-vpc.html -->

- In the left pane, click **Services**, select **Networking**, click **VPC**.
- Click **Start VPC Wizard**.
- Select **VPC with a Single Public Subnet**.
- Click **Select**.
- Enter the following:
    - VPC name: DynomiteDB VPC
    - Subnet name: DynomiteDB public subnet
    - Accept all other defaults
- Click **Create VPC**.
- Click **OK**.

# Create security group

- In the **VPC Dashboard**, click **Security Groups** in the left nav.
- Click **Create Security Group**.
- Enter the following:
    - Name tag: DynomiteDBSG
    - Group name: DynomiteDBSG
    - Description: DynomiteDB security group
    - VPC: Select DynomiteDB VPC
- Click **Yes, Create**.

## Update inbound rules

- Select **DynomiteDBSG**.
- Click the **Inbound Rules** tab.
- Click **Edit*.
- Enter the following:
    - Type: SSH
    - Protocol: TCP
    - Port Range: 22
    - Source: Enter your IP address
- Next rule:
    - Type: SSH
    - Protocol: TCP
    - Port Range: 22
    - Source: 10.0.0.0/24
- Next rule:
    - Type: All ICMP
    - Protocol: TCP
    - Port Range: 0-65535
    - Source: 10.0.0.0/24
- Click **Save**.

# Launch EC2 instance

- In menu, click **Services**, select **Compute**, click **EC2**.
- Click **Launch Instance**.
- Click **Select** next to **Ubuntu 14.04 LTS (HVM), SSD Volume Type**.
- Select **m3.medium**.
- Click **Next: Configure Instance Details**.
    - 3 instances
    - Network: Select DynomiteDB VPC.
    - Subnet: Select DynomiteDB Public.
- Click **Next: Add Storage**.
    - Do not change anything.
- Click **Next: Tag Instance**.
    - Key: name
    - Value: dynomite
- Click **Next: Configure Security Group**.
    - Select **Select an existing security group**.
    - Check **DynomiteDBSG**.
- Click **Review and Launch**.
- Click **Launch**.
- Select an existing key pair: **dynomitedb-cluster-aws**.
- Click **Request Spot Instances**.
- Click **View Spot Instances**.

# Assign an elastic IP to an EC2 instance

- In the left pane, click **Services**, select **Networking**, click **VPC**.
- Click **Elastic IPs**.
- Click **Allocate New Address**.
    - Network platform: Select **EC2-VPC**.
    - Click **Yes, Allocate**.
- Select the newly created elastic IP, then click **Actions**, click **Associate Address**.
- Enter the following:
    - Associate Address: Instance
    - Instance: Select an instance
    - Associate Address: Accept default
- Click **Yes, Associate**.

# Connect to instance with elastic IP

```bash
ssh -i ~/.ssh/name-of-your-key-file.pem -p 22 ubuntu@elastic-ip-address
```
          
# Start in-memory backend (Redis)

```bash
sudo service dynomitedb-redis start
```

# Start `dynomite` server

```bash
sudo service dynomite start
```

# Update `dynomite.yaml configuration

sudo vi /etc/dynomitedb/dynomite.yaml

```yaml
dyn_o_mite:
  datacenter: us-west-oregon
  rack: us-west-2b
  dyn_listen: 10.0.0.219:8101
  data_store: 0
  listen: 10.0.0.219:8102
  dyn_seed_provider: simple_provider
  dyn_seeds:
  - 10.0.0.235:8101:us-west-2b:us-west-oregon:1431655765
  - 10.0.0.152:8101:us-west-2b:us-west-oregon:2863311530
  auto_eject_hosts: true
  server_retry_timeout: 30000
  server_failure_limit: 3
  servers:
  - 127.0.0.1:22122:1
  tokens: 0
  secure_server_option: datacenter
  pem_key_file: /etc/dynomitedb/dynomite.pem
```

a_dc
dyn_o_mite:
  datacenter: dc2
  rack: rack1
  dyn_listen: 127.0.0.2:8101
  dyn_seeds:
  - 127.0.0.1:8101:rack1:dc1:1383429731
  - 127.0.0.4:8101:rack2:dc2:1383429731
  - 127.0.0.5:8101:rack2:dc2:12345678
  - 127.0.0.3:8101:rack1:dc2:12345678 
  listen: 127.0.0.2:8102
  servers:
  - 127.0.0.1:22122:1
  tokens: '1383429731'
  secure_server_option: datacenter
  pem_key_file: conf/dynomite.pem
  data_store: 0

redis_rack1_node.yml
dyn_o_mite:
  datacenter: dc
  rack: rack1
  dyn_listen: 127.0.0.1:8101
  dyn_seeds:
  - 127.0.0.2:8101:rack2:dc:1383429731
  listen: 127.0.0.1:8102
  servers:
  - 127.0.0.1:22123:1
  tokens: '1383429731'
  secure_server_option: datacenter
  pem_key_file: conf/dynomite.pem
  data_store: 0


Restart backend and dynomite

```bash
redis-cli -h 10.0.0.219 -p 8102
```

# Create NAT gateway

- In the left pane, click **Services**, select **Networking**, click **VPC**.
- Click **NAT Gateways** in the left nav.
- Click **Create a NAT Gateway**.
- Enter the following information:
    - Subnet: Select DynomiteDB Public.
    - Elastic IP Allocation ID: Click **Create New EIP**.
- Click **Create a NAT Gateway**.

## Update the route table

- In the left nav, select the drop-down for the DynomiteDB VPC.
- Click **Route Tables** in the left nav.
- Select the private subnet.
- Click the **Routes Tab**.
- Click **Edit**.
- Click **Add another route**.
- 

# Create NAT instances for EC2 hosts on private VPC w/o EIP

> In production use a NAT Gateway.

















# Launch EC2 instance (ORIGINAL)

- Click the **Services** menu, click **EC2**.
- Click **Launch Instance**.
- Click **Select** next to **Ubuntu 14.04 LTS (HVM), SSD Volume Type**.
- Select **m3.medium**.
- Click **Next: Configure Instance Details**.
    - 3 instances
    - Click **Create new VPC**.
        - Click **Create VPC**.
        - Enter the following:
            - Name tag: DynomiteDB VPC
            - CIDR block: 10.0.0.0/24
            - Tenancy: Default
        - Click **Yes, Create**.
    - Click **Create new subnet**.
        - Enter the following:
            - Name tag: DynomiteDB subnet
            - VPC: DynomiteDB VPC
            - Availability Zone: No Preference
            - CIDR block: 10.0.0.0/24
        - Click **Yes, Create**.
    - Auto-assign Public IP: Enable
    - Click **Create new IAM role**.
        - Click **Create New Role**.
        - Role Name: DynomiteDB_IAM
        - Click **Next Step**.
        - Click **Select** next to **Amazon EC2**.
        - Check the following:
            - **Administrator Access**
            - **AmazonEC2FullAccess**
            - **AmazonRoute53FullAccess**
            - **AmazonS3FullAccess**
            - **AmazonVPCFullAccess**
            - **IAMFullAccess**
            - **IAMUserSSHKeys**
        - Click **Next Step**.
        - Click **Create Role**.
    - IAM role: DynomiteDB_IAM
- Click **Next: Add Storage**.
- Click **Next: Tag Instance**.
    - Key: name
    - Value: dynomite
- Click **Next: Configure Security Group**.
    - Select **Create a new security group**.
    - Enter the following:
        - Security group name: dynomitedb
        - Description: DynomiteDB security group
- Click **Review and Launch**.
- Click **Launch**.
- Create a new key pair named **dynomitedb-cluster-aws**.
- Click **Download Key Pair**.
- Click **Request Spot Instances**.
- Click **View Spot Instances**.

- Click **Instances** in the left pane.

```bash
mv ~/dynomitedb-cluster-aws.pem ~/.ssh/
chmod 400 ~/.ssh/dynomitedb-cluster-aws.pem
ssh -i ~/.ssh/dynomitedb-cluster-aws.pem root@52.37.88.69
```

# Create AMI


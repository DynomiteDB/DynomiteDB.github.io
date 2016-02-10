---
title: "Download DynomiteDB"
date: "2016-02-10T16:11:45-08:00"
draft: false

---

<div class="alert alert-danger">
    The DynomiteDB package described below is not yet available. The scheduled release date is March 4, 2016.
</div>
                    
## Prerequisites

Install GPG before continuing with the installation.

```bash
sudo apt-get install gnupg
```

## Download

Open a terminal and run the following commands to download DynomiteDB v0.5.6 with the Redis backend.

```bash
mkdir ~/opt/packages && cd $_

wget https://dynomitedb.com/download/current/dynomitedb-v0.5.6.deb

wget https://dynomitedb.com/download/current/dynomitedb-v0.5.6.dsc
```

## Install

First verify the package's signature and then install DynomiteDB.

```bash
gpg --verify dynomitedb-v0.5.6.dsc

sudo dpkg -i dynomitedb-v0.5.6.deb
```

---
title: "Install Docker on Ubuntu 14.04"
slug: "install-docker-ubuntu-14-04"
date: "2016-03-13T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.7"
type: "dynomite-v0.5.7"
docurl: "/docs/dynomite/v0.5.7/"
weight: 101
docsection: "Introduction"
draft: false

---

The following instructions are provided for your convenience. If you have an problems installing Docker on Ubuntu 14.04, then we strongly recommend that you view the full installation instructions on Docker.com.

# Check kernel version

```bash
sudo uname -r
# Kernel must be >= 3.10
```

# Install prerequisites and Docker

```bash
sudo apt-get update

sudo apt-get upgrade -y
```

```bash
sudo apt-get install apt-transport-https ca-certificates
```

```bash
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```

```bash
sudo vi /etc/apt/sources.list.d/docker.list
```

Paste the following into `docker.list`:

```bash
deb https://apt.dockerproject.org/repo ubuntu-trusty main
```

```bash
sudo apt-get update
```

```bash
sudo apt-cache policy docker-engine
```

```bash
sudo apt-get install -y linux-image-extra-$(uname -r)
```

```bash
sudo apt-get install -y apparmor
```

```bash
sudo apt-get install -y docker-engine
```

```bash
sudo service docker start
```

# Create a `docker` group

The creation of a `docker` group allows you to run Docker without the `sudo` command.

```bash
sudo usermod -aG docker $USER
```

Logout and then login again.

```bash
docker run hello-world
```

# Install Docker Compose

```bash
mkdir -p ~/opt/packages/docker && cd $_
```

```bash
curl -L https://github.com/docker/compose/releases/download/1.6.2/docker-compose-`uname -s`-`uname -m` > ./docker-compose
```

```bash
sudo mv docker-compose /usr/local/bin/docker-compose
```

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

```bash
curl -L https://raw.githubusercontent.com/docker/compose/$(docker-compose version --short)/contrib/completion/bash/docker-compose > ./docker-compose-bash-completion
```

```bash
sudo mv  ./docker-compose-bash-completion /etc/bash_completion.d/docker-compose
```

```bash
docker-compose --version
```

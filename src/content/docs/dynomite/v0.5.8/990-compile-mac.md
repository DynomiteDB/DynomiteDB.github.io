---
title: "Compile - Mac"
slug: "compile-mac"
date: "2016-03-14T20:22:33-08:00"
product: "Dynomite"
version: "v0.5.8"
type: "dynomite-v0.5.8"
docurl: "/docs/dynomite/v0.5.8/"
docsection: "Miscellaneous"
weight: 1000
draft: false

---


Install OpenSSL via `brew`.

```bash
brew install openssl

brew link --force openssl
```

```bash
cd ~/repos/dynomite
```

```bash
ln -s /usr/local/opt/openssl/include/openssl src/openssl
````

```bash
autoreconf -fvi
````

```bash
./configure --enable-debug=log
````

```bash
make
````

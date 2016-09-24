# cloud-config-server [![](https://images.microbadger.com/badges/image/auguster/cloud-config-server.svg)](https://microbadger.com/images/auguster/cloud-config-server)

Docker NodeJS server providing cloud-config to Cloud instances using [EJS](http://ejs.co) template language

# User manual

## File query
The cloud-config file is queried through a `GET HTTP` request containing a `config` parameter containing the name of the file to serve.
If the file is an EJS template you can give any parameters you want through `GET` parameters to generate the file.

`http://<server>:<port>/<filename>?<params ...>`

## File storage
The cloud-config files should be stored in the `data/` folder of the application bearing '.ejs' as extension.

## Templating
This server uses [EJS](http://ejs.co) for file templating. This allows code factoring (through includes), variables, dynamic scripting...

Here is a [working example](data) of what you can do:
```
#cloud-config
<% var host = host || 'host' -%>
<% var domain = domain ? '.' + domain : '' -%>
hostname: "<%= host %><%= domain %>"

ssh_authorized_keys:
  <% include partials/ssh_keys/main %>

coreos:
  update:
    reboot-strategy: best-effort
<% include partials/etcd %>
  units:
<% include partials/units/etcd2_unit.ejs %>
<% include partials/units/fleet_unit.ejs %>
```
Be aware that cloud-config files are writen in YAML which are space-indentation sensitive !
A more complete example can be found in the project [coreos-consul-haproxy](https://github.com/auguster/coreos-consul-haproxy).

## Building
To build the docker image run:
```
docker build -t cloud-config-server .
```

# Docker
The up-to-date image for this project is hosted on docker hub.

To retrieve the image and run it:
```
docker run -d -P auguster/cloud-config-server
```
This will run the image with the working example. To provide your own templates you can mount the `data/` folder on your host:
```
docker run -d -p 8080 -v $PWD/data:/data:ro auguster/cloud-config-server
```

# Usage
To boot a cloud-config compatible instance you have to make it point to the cloud-config-server. The following techniques have been tested on CoreOS only, for other distros you might have to adapt them.

## PXE
With PXE this can be done by writing the URL on the kernel command line. An example is avaible on the documentation about [Booting CoreOS via PXE](https://coreos.com/os/docs/latest/booting-with-pxe.html).

To enable the internal TFTP in libvirt / virt manager, you can follow [this nice tutorial](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Virtualization_Host_Configuration_and_Guest_Installation_Guide/chap-Virtualization_Host_Configuration_and_Guest_Installation_Guide-Libvirt_network_booting.html).

## Static content
Most cloud provider only allow passing a static config content to your instance. This content cannot be edited afterward.

On CoreOS, you can call an external cloud-config files using the following (hacky) technique:
```
#cloud-config

coreos:
  units:    
    - name: cloudinit-url.service
      command: restart
      content: |
        [Unit]
        Description=Cloudinit reconfiguration using external cloud-config file

        [Service]
        Type=oneshot
        ExecStart=/usr/bin/coreos-cloudinit --from-url http://<cloud-config-server's url>
```
The configuration of the external `cloud-config` file will be appened to the existing one. Technically you could chain `cloud-config` file this way but that's probably a bad idea.

# References
- [Bootcfg](https://github.com/coreos/coreos-baremetal#bootcfg): CoreOS's own PXE/cloud-config server using go-template files

# Licence
The MIT License (MIT) Copyright (c) 2016 Rémi AUGUSTE

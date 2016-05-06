# cloud-config-server
Docker NodeJS server providing cloud-config to Cloud instances using [EJS](http://ejs.co) template language

# user manual

## file query
The cloud-config file is queried through a `GET HTTP` request containing a `config` parameter containing the name of the file to serve.
If the file is an EJS template you can give any parameters you want through `GET` parameters to generate the file.

`http://<server>:<port>/<filename>?<params ...>`

## file storage
The cloud-config files should be stored in the `data/` folder of the application bearing '.ejs' as extension.

## templating
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

# TODO
If anyone wants to contribute to the project:
 - ~~code server~~
 - ~~templating~~
 - dockerize it
 - add SSL support
 
# LICENCE
The MIT License (MIT)
Copyright (c) 2016 Rémi AUGUSTE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

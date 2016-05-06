# Note
To be processed by EJS, the template file should bear the `.ejs` extension.

# Working example
This working examples showcases the power of templating.

One the server is running, you can get the rendered config file through:
[http://localhost:8080/server?host=server&domain=example.com](http://localhost:8080/server?host=server&domain=example.com)

## Explanations
All cloud config file yould start with `#cloud-config`.

```
<% var host = host || 'host' -%>
<% var domain = domain ? '.' + domain : '' -%>
```
Sets the default values for `host` and `domain` if they're not present in the URL.
The `-%>` removes the creation of new lines in the output.
`'.' + domain` adds a dot in front of the domain to facilitate URL creation (e.g. `host.domain`).

```
hostname: "<%= host %><%= domain %>"
```
Appends the value of the variables `host` and `domain` in a string.

```
  <% include partials/ssh_keys/main %>
```
Includes the content of the file `partials/ssh_keys/main.ejs` here.
The content of the file doesn't have to be space-indented as the include is already well indented.

```
<% include partials/etcd %>
```
Same as before except the content of the file `partials/etcd.ejs` **has** to be space-indented.
This was done because only the first line of the file would have been correctly indented thus making everything confusing.

`partials/etcd.ejs` also has access to the global variables `host` and `domain` defined in the main file.
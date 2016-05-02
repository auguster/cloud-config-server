# cloud-config-server
Docker NodeJS server providing cloud-config to CoreOS instances

# user manual

## file query
The cloud-config file is queried through a `GET HTTP` request containing a `config` parameter containing the name of the file to serve.
If the file is a template an `instance` parameter should be set to specify to generate the file.

`http://<server>:<port>/?config=<filename>&instance=<number>`

## file storage
The cloud-config files should be stored in the `data/` folder of the application

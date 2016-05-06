# cloud-config-server
Docker NodeJS server providing cloud-config to CoreOS instances

# user manual

## file query
The cloud-config file is queried through a `GET HTTP` request containing a `config` parameter containing the name of the file to serve.
If the file is a template an `instance` parameter should be set to specify to generate the file.

`http://<server>:<port>/<filename>?instance=<number>`

## file storage
The cloud-config files should be stored in the `data/` folder of the application

# TODO
If anyone wants to contribute to the project:
 - code server
 - dockerize it
 - add SSL support
 
# LICENCE
The MIT License (MIT)
Copyright (c) 2016 Rémi AUGUSTE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

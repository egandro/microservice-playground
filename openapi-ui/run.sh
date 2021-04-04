#!/bin/bash

if [[ ! -d /root/public ]]
then
    echo "error: /root/public doesn't exists on your filesystem. mount a volume with public/openapi.json"
    echo "   giving up..."
    sleep infinity
fi

./openapi-ui
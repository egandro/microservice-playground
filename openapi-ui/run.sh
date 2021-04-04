#!/bin/bash

if [[ ! -d /public ]]
then
    echo "error: /public doesn't exists on your filesystem. mount a volume with public/openapi.json"
    echo "   giving up..."
    sleep infinity
fi

./openapi-ui
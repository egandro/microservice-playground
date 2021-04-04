#!/bin/bash

if [[ ! -d /config ]]
then
    echo "error: /config doesn't exists on your filesystem. mount a volume with config/krakend.json"
    echo "   giving up..."
    sleep infinity
fi

FC_ENABLE=1 \
FC_SETTINGS="/config/settings" \
FC_PARTIALS="/config/partials" \
krakend run -d -c "/config/krakend.json"
#!/bin/bash

# https://www.krakend.io/blog/reloading-the-krakend-configuration/

if [[ ! -d /config ]]
then
    echo "error: /config doesn't exists on your filesystem. mount a volume with config/krakend.json"
    echo "   giving up..."
    sleep infinity
fi

# reflex must be run in the directory we want to watch
cd /config

FC_ENABLE=1 \
FC_SETTINGS="/config/settings" \
FC_PARTIALS="/config/partials" \
reflex -r '.*'  -s  -- /krakend run -c /config/krakend.json -d
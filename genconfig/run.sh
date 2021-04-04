#!/bin/bash


if [[ ! -d /work ]]
then
    echo "error: /work doesn't exists on your filesystem. mount a volume with config"
    exit -1
fi

node ./index.js $@
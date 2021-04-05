FROM python:3-buster

#https://github.com/mingrammer/diagrams
RUN pip install diagrams

RUN apt-get update \
    && apt-get install -y -qqq graphviz \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /work

RUN echo '#!/bin/bash\n\
USER=$(stat -c '%u' $1)\n\
GROUP=$(stat -c '%g' $1)\n\
python $@\n\
chown -R $USER:$GROUP .\n'\
>> /usr/local/bin/run \
&& chmod 755 /usr/local/bin/run
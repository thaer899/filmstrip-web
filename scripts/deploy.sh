#!/usr/bin/env bash

machine_name=$1

if [[ -n "$machine_name" ]]; then
  docker-machine env $machine_name >/dev/null

  if [ $? -eq 0 ]; then
    eval $(docker-machine env $machine_name) \
      && docker-machine ssh $machine_name mkdir -p /home/core/filmstrip/data \
      && docker-machine scp Caddyfile ${machine_name}:/home/core/filmstrip/data \
      && docker-compose build \
      && docker-compose up -d
  fi
else
  echo "Please specify your docker machine name"
  exit 1
fi

#!/usr/bin/env bash
# wait-for-it.sh
# Usage: ./wait-for-it.sh host:port [-- command args]
set -e
hostport="$1"
shift
cmd="$@"
while ! nc -z ${hostport%:*} ${hostport#*:}; do
  echo "Waiting for $hostport..."
  sleep 2
done
exec $cmd

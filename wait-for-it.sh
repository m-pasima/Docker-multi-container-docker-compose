#!/usr/bin/env sh
# Usage: /wait-for-it.sh host:port -- command...
HOSTPORT="$1"
shift
HOST=$(echo "$HOSTPORT" | cut -d: -f1)
PORT=$(echo "$HOSTPORT" | cut -d: -f2)

echo "Waiting for $HOST:$PORT..."
while ! nc -z "$HOST" "$PORT"; do
  sleep 1
done
echo "Ready!"
exec "$@"




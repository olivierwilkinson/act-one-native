#!/bin/bash

SCHEMA_FILE=${1:-"graphql-schema.json"}

source "scripts/helpers.sh"

trap stop_services EXIT

start_services &&
yarn run apollo schema:download \
  --endpoint=http://localhost:8000/graphql \
  $SCHEMA_FILE

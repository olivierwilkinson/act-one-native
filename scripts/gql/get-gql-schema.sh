#!/bin/bash

SCHEMA_FILE=${1:-"graphql-schema.json"}

yarn run apollo schema:download \
  --endpoint=http://localhost:8000/graphql \
  $SCHEMA_FILE

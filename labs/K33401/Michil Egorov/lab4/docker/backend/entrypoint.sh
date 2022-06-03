#!/bin/bash

until cd /app/
do
    echo "Waiting for server volume..."
done

npm run start

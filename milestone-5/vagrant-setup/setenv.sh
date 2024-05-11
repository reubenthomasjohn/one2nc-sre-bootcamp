#!/bin/bash

DATABASE_URL="postgresql://postgres:testpass123@host.docker.internal:6500/mydb?schema=public"

echo $DATABASE_URL

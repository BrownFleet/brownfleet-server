#!/bin/bash

# Exit on error
set -e

# Load .env file from project root
if [ -f .env ]; then
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
else
  echo "Error: .env file not found"
  exit 1
fi

# Verify required environment variables
if [ -z "$DB_HOST" ] || [ -z "$DB_PORT" ] || [ -z "$DB_USERNAME" ] || [ -z "$DB_NAME" ]; then
  echo "Error: Missing required environment variables (DB_HOST, DB_PORT, DB_USERNAME, DB_NAME)"
  exit 1
fi

# Run pg_dump with specified options
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -d "$DB_NAME" \
  --clean \
  --if-exists \
  --create \
  --schema=public \
  --extension=uuid-ossp \
  --no-owner \
  --no-privileges \
  --disable-triggers \
  > barcode-buddy-1.sql

echo "Database dump generated successfully: barcode-buddy-1.sql"
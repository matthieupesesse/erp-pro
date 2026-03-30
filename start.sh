#!/bin/bash
export HOSTNAME=0.0.0.0
export PORT=3002
npx prisma generate
npx next dev -H 0.0.0.0 -p 3002

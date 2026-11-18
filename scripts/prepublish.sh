#!/bin/bash

# Prepublish script to remove documentation links from README.md
# This script is generated automatically and should be run before publishing

set -e

README_FILE="README.md"

if [ ! -f "$README_FILE" ]; then
    echo "Error: $README_FILE not found"
    exit 1
fi

# Remove links to documentation files entirely
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s#\[\([^]]*\)\](documentation/services/[^)]*)#\1#g" "$README_FILE"
    sed -i '' "s#\[\([^]]*\)\](documentation/models/[^)]*)#\1#g" "$README_FILE"
else
    # Linux
    sed -i "s#\[\([^]]*\)\](documentation/services/[^)]*)#\1#g" "$README_FILE"
    sed -i "s#\[\([^]]*\)\](documentation/models/[^)]*)#\1#g" "$README_FILE"
fi



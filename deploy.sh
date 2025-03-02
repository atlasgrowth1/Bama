
#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Adding all changes...${NC}"
git add .

echo -e "${BLUE}Committing changes...${NC}"
git commit -m "Update for deployment $(date)"

echo -e "${BLUE}Pushing to GitHub...${NC}"
git push -u origin main

echo -e "${GREEN}Successfully pushed to GitHub repository!${NC}"

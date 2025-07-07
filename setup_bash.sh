#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "\n${BOLD}[Step $1]${NC} ${CYAN}$2${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to run commands with error handling
run_command() {
    local cmd=$1
    local desc=$2
    
    echo -e "${BLUE}Running: $cmd${NC}"
    if eval $cmd; then
        print_success "$desc completed successfully"
        return 0
    else
        print_error "$desc failed"
        return 1
    fi
}

# Function to check if file exists
check_file() {
    local file=$1
    local desc=$2
    
    if [ -f "$file" ]; then
        print_success "$desc exists"
        return 0
    else
        print_warning "$desc not found at: $file"
        return 1
    fi
}

# Function to create .env file
create_env_file() {
    if [ ! -f ".env" ]; then
        cat > .env << EOF
# Database Configuration
DATABASE_URL="file:../../../task_management.db"

# Server Configuration
PORT=3006
CLIENT_URL="http://localhost:5173"

# Node Environment
NODE_ENV=development
EOF
        print_success "Created .env file"
    else
        print_warning ".env file already exists, skipping creation"
    fi
}

# Function to ensure directories exist
ensure_directories() {
    local dirs=("src/backend/prisma" "dist")
    
    for dir in "${dirs[@]}"; do
        if [ ! -d "$dir" ]; then
            mkdir -p "$dir"
            print_success "Created directory: $dir"
        fi
    done
}

# Main setup function
main() {
    echo -e "\n${BOLD}🚀 Starting Task Management App Setup...${NC}"
    echo "This script will set up your development environment"
    
    # Step 1: Check project structure
    print_step 1 "Checking project structure"
    if ! check_file "package.json" "package.json"; then
        print_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
    
    # Step 2: Create necessary directories
    print_step 2 "Creating necessary directories"
    ensure_directories
    
    # Step 3: Create .env file
    print_step 3 "Setting up environment variables"
    create_env_file
    
    # Step 4: Install dependencies
    print_step 4 "Installing dependencies"
    if ! run_command "yarn install" "Dependency installation"; then
        print_error "Failed to install dependencies. Please check your yarn installation."
        exit 1
    fi
    
    # Step 5: Set up database
    print_step 5 "Setting up database"
    
    # Generate Prisma client
    if ! run_command "yarn db:generate" "Prisma client generation"; then
        print_error "Failed to generate Prisma client"
        exit 1
    fi
    
    # Push schema to database
    if ! run_command "yarn db:push" "Database schema push"; then
        print_error "Failed to push schema to database"
        exit 1
    fi
    
    # Seed the database
    if ! run_command "yarn db:seed" "Database seeding"; then
        print_warning "Database seeding failed or skipped"
    fi
    
    # Step 6: Build the project
    print_step 6 "Building the project"
    if ! run_command "yarn build" "Project build"; then
        print_warning "Build failed, but continuing..."
    fi
    
    # Check if backend was built properly
    if ! check_file "dist/backend/server.js" "Backend build"; then
        echo -e "${YELLOW}Backend not found in dist, running explicit TypeScript compilation...${NC}"
        run_command "tsc -b" "TypeScript compilation"
    fi
    
    # Step 7: Final checks
    print_step 7 "Running final checks"
    
    local all_good=true
    local critical_files=(
    "src/backend/prisma/schema.prisma:Prisma schema"
    "task_management.db:SQLite database"
    ".env:Environment file"
    )


    for file_desc in "${critical_files[@]}"; do
        IFS=':' read -r file desc <<< "$file_desc"
        if ! check_file "$file" "$desc"; then
            all_good=false
        fi
    done

    echo -e "\n${CYAN}$(printf '=%.0s' {1..50})${NC}"
    echo -e "${BOLD}🎉 SETUP COMPLETE!${NC}"
    echo -e "${CYAN}$(printf '=%.0s' {1..50})${NC}"

    if [ "$all_good" = true ]; then
        print_success "All components are ready!"
        echo -e "\n${BOLD}📋 Next steps (automated below):${NC}"
        echo "Starting backend and frontend servers..."

        # Start backend
        if [ -f "dist/backend/server.js" ]; then
            nohup node dist/backend/server.js > backend.log 2>&1 &
            print_success "Backend server started (log: backend.log)"
        else
            print_warning "Backend server.js not found, skipping backend start"
        fi

        # Start frontend
        nohup yarn dev > frontend.log 2>&1 &
        print_success "Frontend dev server started (log: frontend.log)"

        echo -e "\n${GREEN}🌐 Access the app:${NC}"
        echo -e "   Frontend: ${GREEN}http://localhost:5173${NC}"
        echo -e "   Backend API: ${GREEN}http://localhost:3006/api${NC}"
    else
        print_warning "Setup completed with some issues. Please check the warnings above."
    fi
    
    echo -e "\n${BOLD}📚 Available commands:${NC}"
    echo "  yarn dev          - Start frontend development server"
    echo "  yarn build        - Build the project"
    echo "  yarn db:generate  - Generate Prisma client"
    echo "  yarn db:push      - Push schema to database"
    echo "  yarn db:seed      - Seed the database"
    echo "  yarn db:studio    - Open Prisma Studio"
    echo "  yarn db:migrate   - Run migrations"
     echo -e "\n${GREEN}🌐 Server started:${NC}"
     echo -e "   Frontend: ${GREEN}http://localhost:5173${NC}"
     echo -e "   Backend API: ${GREEN}http://localhost:3006/api${NC}"
    
    
    echo -e "\n${GREEN}✨ Happy coding!${NC}"
}

# Run the setup
main "$@"

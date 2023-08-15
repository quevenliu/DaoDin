#!/bin/bash

check_environment_variable() {
    local variable_name="$1"
    
    if test -v "$variable_name"; then
        return 0  
    else
        return 1  
    fi
}


function write_secret() {
  local destination_path="$1"
  local secret_name="$2"

  if [ $? -eq 1 ]; then
    echo "The environment variable '$variable_name' does not exist or is not set." 
    exit 1
  fi

  echo "Writing the secret '$secret_name' to '$destination_path'..."
  echo "${!secret_name}" > "$destination_path"
  echo "Secret written successfully."
  
}

cd ..

echo "write_secrets.sh working on $PWD"

write_secret "./backend/.env" "BACKEND_ENV"

echo "write_secrets.sh finished working on $PWD"


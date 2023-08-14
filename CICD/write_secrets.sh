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

echo "write_secrets.sh working on $PWD"

mkdir ./database
mkdir ./nginx
mkdir ./var

write_secret "./nginx/default.conf" "NGINX_CONF"
write_secret "./nginx/ssl-dhparams.pem" "DHPARAMS_PEM"
write_secret "./nginx/fullchain.pem" "FULLCHAIN_PEM"
write_secret "./nginx/privkey.pem" "PRIVKEY_PEM"
write_secret "./nginx/options-ssl-nginx.conf" "SSL_CONF"
write_secret "./var/daodin.env" "DAODIN_ENV"
write_secret "./.env" "MAIN_ENV"

echo "write_secrets.sh finished working on $PWD"


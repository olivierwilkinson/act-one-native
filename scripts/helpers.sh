wait_for_server() {
  local uri=$1
  local delay=${2:-20}
  local name=${3:-$1}

  local i=0
  until $(curl --max-time 0.5 --silent --fail --output /dev/null $uri); do
    i=$(($i+1))
    if [[ $i -gt $delay ]]; then
      printf "${RED}${name} did not start.${NC}\n"
      return 1
    fi
    printf "${ORANGE}Waiting for $name to start...${NC}\n"
    sleep 1
  done
  printf "${GREEN}${name} has started.${NC}\n"
}

wait_for_backend() {
  wait_for_server 'localhost:8000' 10 'ActOne Backend'
}

start_services() {
  docker-compose up -d --force-recreate
  wait_for_backend
}

stop_services() {
  docker-compose down
  trap '' EXIT INT TERM
  exit $err
}

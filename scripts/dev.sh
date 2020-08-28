source 'scripts/helpers.sh'

export NODE_ENV=development

trap stop_services SIGINT EXIT
start_services
expo start
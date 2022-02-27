#!/bin/bash
BUILD_REQUIRED=false
invalid_deployment_env_error() {
  echo "Unexpected deployment environment value. Add the --deploy-env=<value> as the first argument. Run 'bash push_to_acr.sh --help' for more info."
  exit 0
}

for i in "$@"; do
  case $i in
    -h|--help)
      echo "options:"
      echo "-h, --help                Shows brief help"
      echo "--build                   Build images before spinning up the containers. Must set as the first argument."
      echo "--deploy-env=<value>      Set the deployment environment value andd spin up the containers."
      exit 0
      ;;
    --build)
      BUILD_REQUIRED=true
      shift
      ;;
    --deploy-env=*)
      DEPLOY_ENV="${i#*=}"
      if [ "$DEPLOY_ENV" == "NULL" ]; then
          invalid_deployment_env_error
      elif [ "$DEPLOY_ENV" == "dev" ]; then
        if [ "$BUILD_REQUIRED" == "true" ]; then
          docker-compose up --build
        else
          docker-compose up
        fi
      fi
      shift
      ;;
  esac
done
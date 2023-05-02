rm -R -f ./migrations &&
pipenv run init &&
psql -U rhyccia -c 'DROP DATABASE project_db;' || true &&
psql -U rhyccia -c 'CREATE DATABASE project_db;' &&
psql -U rhyccia -c 'CREATE EXTENSION unaccent;' -d project_db &&
pipenv run migrate &&
pipenv run upgrade
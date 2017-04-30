#!/usr/bin/env bash

echo "Install dependencies"
apt-get update -y
apt-get install -y --no-install-recommends \
                      build-essential python-dev \
                      vagrant rlwrap python-pip python-virtualenv unzip make \
                      git vim postgresql postgresql-contrib npm python3-pip

cd /vagrant/

# postgres
cat > /etc/postgresql/9.6/main/pg_hba.conf <<EOF
# FOR DEVELOPMENT ONLY!!!
local   all             all                                     trust
EOF
sudo service postgresql restart

sudo su postgres -c "psql -c \"CREATE ROLE vagrant SUPERUSER LOGIN PASSWORD 'vagrant'\" "
sudo su postgres -c "createdb user_administration"

# setup backend
pip3 install -r backend/requirements.txt
python3 backend/manage.py migrate

# setup frontend
cd frontend && npm install && cd ../

echo 'cd /vagrant/' > /home/ubuntu/.bashrc

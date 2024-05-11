## Milestone-5: Deploy REST API & its dependent services on bare metal

### Spin up `Vagrant` box:

The `milestone-5` folder contains two folders: `vagrant-deployment` and `vagrant-setup`. The `vagrant-setup` contains the `Vagrantfile` and the `settings.yaml`. These are the files used to spin up the Vagrantbox. Simply running `sudo vagrant up` will spin up the box.

Here are some helpful commands used to interact with the box:

```sh
# Stand up VM
sudo vagrant up

# Halt VM
sudo vagrant halt

# Destroy VM
sudo vagrant destroy

# SSH into Vagrant box
vagrant ssh <box-name>

# Logout
logout

# Get status of boxes
sudo vagrant status
```

### Set up the required deployments inside the `Vagrant` box:

The `vagrant-setup` folder contains 4 files.

1. An `api.Dockerfile` to dockerize the api and create an image.
2. 1. An `nginx.Dockerfile` to dockerize the api and create an image.
3. An `nginx.conf` to configure the nginx server for our purposes. This file is used in the `nginx.Dockerfile`.
4. A `docker-compose.yaml` to deploy 2 api containers, and one nginx container, and on PostgreSQL db, all using a single `docker compose up` command.

To view the results of this milestone:

`cd milestone-5/vagrant-setup` \
`docker compose up`

References:

1. https://devopscube.com/build-vms-mac-silicon-with-vagrant/

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

```sh
whoami
sudo chown -R <user> <directory>
```

### Set up the required deployments inside the `Vagrant` box:

The `vagrant-deployment` folder contains 6 files.

1. An `api.Dockerfile` to dockerize the api and create an image.
2. An `nginx.Dockerfile` to dockerize the api and create an image.
3. An `nginx.conf` to configure the nginx server for our purposes. This file is used in the `nginx.Dockerfile`.
4. A `docker-compose.yaml` to deploy 2 api containers, and one nginx container, and on PostgreSQL db, all using a single `docker compose up` command.
5. `.env` to hold the `DATABASE_URL`. Ensure this file is present.
6. `README.md`
   To view the results of this milestone:

```sh
# cd into the vagrant-setup folder
cd milestone-5/vagrant-setup
# spin up the vagrant box
sudo vagrant up
# ssh into the box
sudo vargant ssh <box-name>
# cd into the deployments folder
cd /one2n-bootcamp/milestone-5/vagrant-deployment
# start the docker daemon inside the box
sudo systemctl start docker
# create a docker network to put all our containers inside
docker network create -d bridge milestone-5-net
# spin up the PostgreSQL db container, and connect it to the created network
docker run -d --name postgres_container -e POSTGRES_DB=mydb --network=milestone-5-net -e POSTGRES_PASSWORD=testpass123 -e POSTGRES_USER=postgres -p "6500:5432" postgres
# run docker compose up
sudo docker compose up -d
```

### Gotchas

1. The vagrant `file` provisioner uses `Net::SCP` which is very slow, and fails when a large directory is being copied.
2. Ideally, the `api` directory should be inside `vagrant-deployment`. Right now, it is not (Because of 1). Thats why running `docker compose config` will fail. Because the path to the `.env` file is incorrect. This will be corrected when we run `sudo vagrant up`, the `Vagrantfile` moves the api directory into the `vagrant-deployment` dir.

3. `compose` creates a default network and places all the services defined within the file into that network. We want our services, and the db to lie in the same network. So we create our own network and put the db inside it first. Then we tell compose to use the same network. This way, our api can reach the DB.

References:

1. https://devopscube.com/build-vms-mac-silicon-with-vagrant/

Misc

By adding ENV PORT 3000 in the Dockerfile, you set a default value of 3000 for the PORT environment variable. However, you can override this default value when you run the container using the -e flag.

For example, to run your container on port 4000, you can use the following docker run command:
`docker run -e PORT=4000 -p 4000:4000 your-image-name`

-e PORT=4000 sets the PORT environment variable to 4000 inside the container.
-p 4000:4000 maps port 4000 on your host machine to port 4000 on the container.

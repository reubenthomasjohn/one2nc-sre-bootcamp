## 7 - Deploy REST API & its dependent services in K8s

### Setup the cluster

```sh
# If linux:
sudo systemctl docker start
# start the minikube cluster
minikube start
# Add 3 worker nodes in a for loop
for i in {1..3}; do minikube node add --worker=true; done

# label the nodes
kubectl label nodes minikube-m02 type=application
kubectl label nodes minikube-m03 type=dependent_services
kubectl label nodes minikube-m04 type=database

# create the namespaces
kubectl create namespace vault
kubectl create namespace student-api
kubectl create namespace external-secrets
```

### Building and pushing the api to Dockerhub.

```sh
# Build the api image:
`docker build -t reubenthomasjohnn/api -f api.Dockerfile .`

# Login to dockerhub
`docker login`

# Tag your image
`docker tag 1efae1b03f04 reubenthomasjohn/student_api:1.0`

# Push the image
`docker push reubenthomasjohn/student_api:1.0`
```

### Installing Vault Server on the Cluster:

Vault itself implements lots of different secret engines. ESO only supports the KV Secrets Engine.

```sh
kubectl create namespace vault
kubectl --namespace='vault' get all
helm repo add hashicorp https://helm.releases.hashicorp.com
helm search repo hashicorp/vault --versions
helm install vault hashicorp/vault --namespace vault --version 0.28.0
```

### Editing the vault service

```sh
kubectl edit svc vault-internal
# Remove the lines with ClusterIP, and change the type from ClusterIP to NodePort.
kubectl delete -f <file_name>
kubectl apply -f <file_name>
```

### Configure vault

Save the keys & token -> unseal vault -> enable the kv engine -> create the secret

### Install ESO

```sh
helm repo add external-secrets https://charts.external-secrets.io

helm install external-secrets \
   external-secrets/external-secrets \
    -n external-secrets \
    --create-namespace \
   --set installCRDs=true
```

### Create the secretstore and external secret

make sure to change the vault endpoint and token for your endpoint and you need to encode it as base64 before putting it in the file.

base64 encoding:
`echo -n 'postgres' | base64`

### Request Flow

Request from browser -> API External service -> API Pod -> DB Internal service -> DB Pod

`kubectl edit svc vault-internal -n vault`

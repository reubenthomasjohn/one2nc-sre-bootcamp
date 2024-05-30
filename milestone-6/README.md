```sh
# If Linux:
sudo systemctl docker start
# start the minikube cluster
minikube start
# run this command 3 times, to add 3 nodes
minikube node add --worker=true
```

Now, running `minikube node list` should return something like:

```sh
reubenthomas@192 one2n-bootcamp % minikube node list
minikube        192.168.49.2
minikube-m02    192.168.49.3
minikube-m03    192.168.49.4
minikube-m04    192.168.49.5
```

To label the nodes, use the following commands:

```sh
kubectl label nodes minikube-m02 type=application
kubectl label nodes minikube-m03 type=dependent_services
kubectl label nodes minikube-m04 type=observability
```

Run `kubectl get nodes --show-labels` to verify if the labels have been added.

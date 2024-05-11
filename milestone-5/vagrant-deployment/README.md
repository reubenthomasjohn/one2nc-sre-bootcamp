Instructions to deploy resources inside the vagrant box

`sudo docker cp nginx-base:/etc/nginx/conf.d/default.conf ~/Desktop/default.conf`
`sudo docker exec nginx-base nginx -t`
`sudo docker exec nginx-base nginx -s reload`

`sudo docker commit nginx-base nginx-proxy` # gen image from container

or
`cp vagrant-deployment/`
`sudo docker build -t nginx-reverse-proxy .`

References:

1. https://medium.com/@ouassini/sample-load-balancing-solution-with-docker-and-nginx-cf1ffc60e644
2. https://www.youtube.com/watch?v=ZmH1L1QeNHk&ab_channel=CameronMcKenzie

3. Check this: https://www.dbvis.com/thetable/how-to-set-up-postgres-using-docker/

pass in env vars when building??

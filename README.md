# git-docker-manager
Use a Github repository to manage your docker containers

## Usage
### 1. Set up container
```sh
docker run -e REPOSITORY=F1nnM/server-management \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /gitdeploy/:/app/cloned-repo/ \
  f1nnm/git-docker-manager:release-0.5.3 init
```

### 2. Set up repo
Settings > Webhooks. Add a webhook for the push event that sends a request to the container.

### 3. Commit files
The repo should look like this:
```
┬─ compose
│  ├─ <project name>
│  │  ├─ docker-compose.yml
│  │  └─ <.....>
│  └─ <project name 2>
│     ├─ docker-compose.yml
│     └─ <.....>
└─ <.....>
```

Aside the compose folder the repo can contain any other files you want, just like this repo contains a compose folder with a test project
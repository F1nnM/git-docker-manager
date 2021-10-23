# git-docker-manager
Use a Github repository to manage your docker containers

## Usage
### 1. Set up container
```sh
docker run -e WATCHED_REPO="F1nnM/git-server-management" -p 5000:5000 -v /var/run/docker.sock:/var/run/docker.sock gitservermanagement
```

### 2. Set up repo
Settings > Webhooks. Add a webhook for the push event that sends a request to the container.

### 3. Commit files
The repo should look like this
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
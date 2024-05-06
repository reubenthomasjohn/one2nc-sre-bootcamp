## Milestone-3: CI Pipelining

1. Ensure you have `homebrew` and `make` and `docker` installed on your system.
2. We use ESLint to do JS code linting. Run `npm init @eslint/config` and perform the setup.
3. Next run `npx eslint .` to perform linting on the entire api/ directory.

## Setting up repository for CI runs:

1. Add repository secrets for `DOCKER_HUB_USERNAME`, `DOCKER_HUB_PASSWORD` and `DATABASE_URL`
2. Make sure the Docker daemon is up and running

## Creating a self-hosted actions runner:

1. Go to the `Settings -> Actions -> Runners` tab in your repository.
2. Click on `New self-hosted runner`.
3. Choose the runner image, and architecture.
4. Run the commands given in the terminal.
5. Once they are run, the terminal session in which you ram it will print out the following message

```sh
√ Connected to GitHub

Current runner version: '2.316.0'
2024-05-06 15:49:52Z: Listening for Jobs
```

6. Now you can run your ci-pipeline, and the job will be picked up by your self-hosted GA runner.

## References:

1. https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/

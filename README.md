# 42-test-python-django-vue

42cc Test Assignment for Python/Django/Vue.js.

A Django 3+ project template.

## System requirements

* global: yarn, node (tested on v15), python>=3.7 (tested on 3.9) *OR* docker

## Code/deployment requirements

* management commands should be proxied to single word make commands, e.g. make test
* app should be deployed on a server of your choice (heroku, pythonanywhere, aws, etc.)
* USE ABSOLUTE IMPORTS ALWAYS EVERYWHERE (unless it's init, and you're exporting sibling modules)
* NEVER LEAVE COMMENTED-OUT CODE
* Finished? Run `flake8 .`, `make eslint`, `make test`. Make a note, stick it somewhere, bind it to hotkey. Or better
    set your editor to autoformat code, for backend we're using black, and it has daemon for this, google a plugin for
    your editor. The same goes for frontend.
* Branch naming: `t<number>_short_description`. `short_description` **means** short one.

## Initial setup
You can develop the app in a Docker container or directly on your host, check `.env.example`

Most usable commands are proxied in the `Makefile`

### Create your local env and settings files:
```
$ cp .env.example .env
$ cp fortytwo/local_settings.py.example fortytwo/local_settings.py
```

Configure your local `.env` and `local_settings.py` if necessary.

### Run locally

1. Create a virtual environment and install PIP dependencies from `requirements/dev.txt`
2. Install frontend dependencies: `$ make build`
3. Run tests
  ```
$ make test
  ```
4. Run the app:
  ```
$ make run
  ```
5. Open http://localhost:8000

### Run with Docker

1. Remove `USE_LOCAL` from your `.env`.
2. Build containers:
  ```
$ make build
  ```
3. Run tests and the app the same way with `$ make test` and `$ make run`
4. Open http://localhost:8000

### Deploy to Heroku

1. Create a new app on Heroku and make sure you have installed `heroku-cli`, you're logged in to both Heroku and their container registry:
  ```
$ heroku login
$ heroku container:login
  ```
2. Add PostgreSQL to your Heroku app with
  ```
$ heroku addons:create heroku-postgresql
  ```
3. Set your heroku app name in `.env`
4. Get your credentials for the database:
  ```
heroku config -s -a <your-app-name> | grep DATABASE_URL
  ```
5. Put the credentials to your `local_settings.py`
6. Build the containers and push to Heroku
  ```
$ make h-deploy
  ```

If you're using Mac with M1 processor then you have to use Docker experimental feature `buildx` to build and deploy the containers. Use `make h-deploy-m1` instead. You may need to rebuild your docker containers locally to continue development.

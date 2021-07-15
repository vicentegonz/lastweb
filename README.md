# Arcoprime App Frontend (WIP)

For now:
- create `.env.local` file on root of project to store future env variables.
- `yarn install` to install all dependencies.
- `yarn dev` to run on dev mode.
- Before uploading any change, check linter with `yarn run eslint .` and fix any issues.

## How to run

First, create a `.env` with the required environmental variables:

```sh
cp .env.example .env
nano .env  # Or use your favorite text editor
```

Then, install the dependencies:

```sh
yarn install
```

Finally, start the dev server:

```sh
yarn dev
```

## Environmental variables

There are some environmental variables that need to be added to the repository:

- `NEXT_PUBLIC_API_URL`: **Required on production**. Indicates the URL in which the backend API is serving requests.
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: **Required on production**. This is the client ID of the Google project that allows logins of the users through Google.

## Running the linters

To run the linters, you can use `make`:

```sh
# JavaScript
make eslint  # will run eslint and report errors
make eslint!  # will run eslint and auto-fix errors

# CSS/SASS
make stylelint  # will run stylelint and report errors
make stylelint!  # will run stylelint and auto-fix errors
```

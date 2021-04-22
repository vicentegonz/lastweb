# Arcoprime App Frontend (WIP)

For now:
- create `.env.local` file on root of project to store future env variables.
- `yarn install` to install all dependencies.
- `yarn dev` to run on dev mode.
- Before uploading any change, check linter with `yarn run eslint .` and fix any issues.

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

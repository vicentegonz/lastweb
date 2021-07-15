# Linters
.PHONY: eslint
eslint:
	npx eslint . --ext .js,.jsx --max-warnings=0

.PHONY: eslint!
eslint!:
	npx eslint . --ext .js,.jsx --fix

.PHONY: stylelint
stylelint:
	npx stylelint "**/*.{css,scss}"

.PHONY: stylelint!
stylelint!:
	npx stylelint "**/*.{css,scss}" --fix

test:
	mocha

test-cov:
	@$(MAKE) TEST_FLAGS=--cov test

.PHONY: test test-cov

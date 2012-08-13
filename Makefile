MOCHA = ./node_modules/mocha/bin/mocha
TESTS = tests/*.test.js

test:
	@$(MOCHA) $(TESTS) $(TEST_FLAGS)

.PHONY: test test-cov

export PATH := ./node_modules/.bin:$(PATH)

build:
	@browserify -t reactify client/index.js > public/index.min.js
	@toaster "gpio-car" "build success"
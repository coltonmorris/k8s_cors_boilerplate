# VERSION = $(eval awk '/version/{gsub(/("|",)/,"",$2);print $2};' package.json)
VERSION = 0.1.0
IMAGE_SERVER = gcr.io/my-website-169905/cors-backend
IMAGE_CLIENT = gcr.io/my-website-169905/cors-frontend
# IMAGEID = 

all: build push deploy

.PHONY: build
build:
	# docker tag [IMAGE_ID] [HOSTNAME]/[YOUR-PROJECT-ID]/[IMAGE]
	docker build -t $(IMAGE_SERVER):latest -t $(IMAGE_SERVER):$(VERSION) -f ./backend/Dockerfile .
	docker build -t $(IMAGE_CLIENT):latest -t $(IMAGE_CLIENT):$(VERSION) -f ./frontend/Dockerfile .

push:
	# gcloud docker -- push [HOSTNAME]/[YOUR-PROJECT-ID]/[IMAGE]
	gcloud docker -- push $(IMAGE_SERVER):latest
	gcloud docker -- push $(IMAGE_CLIENT):latest

deploy:
	kubectl apply -f ./backend/kubernetes
	sleep 30
	kubectl apply -f ./frontend/kubernetes

compose:
	docker build -t cors-backend backend
	docker build -t cors-frontend frontend

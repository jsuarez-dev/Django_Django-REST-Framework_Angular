# Django/ Django REST Framework /Angular

This project is an reactive form to upload files in Angular and An REST API in Django REST Framework. An its docker support to easy deploy and test.

## Dependencies to local/server execution

- docker
- docker-compose

## Dependencies to develop/test local

- docker
- docker-compose
- node 12+
- python 3.10+

## local/server execution

First clone and build the containers.

```bash
git clone
cd reactiveForms
docker-compose build
```

Second execute the containers.

```bash
docker-compose up
```

Open in your browser

http://localhost/

## Django test locally

To run the test of django use the command. But you must clone and build the container first.

```bash
docker-compose run --rm dj python manage.py test
```

## Angular test locally

To run the test of angular you must move to the directory and install the node dependencies.

```bash
cd angular/documentsUI
npm install .
```

Then use the command

```bash
npm run test
```

## References

- https://github.com/NetanelBasal/ng-file-upload
- https://medium.com/swlh/django-angular-4-a-powerful-web-application-60b6fb39ef34
- https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

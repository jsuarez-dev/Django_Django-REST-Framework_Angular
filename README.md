# Django/ Django REST Framework /Angular

This project is a reactive form to upload files in Angular and An REST API in Django REST Framework. I have included docker support for easy deployment and test.

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
git clone git@github.com:jadry92/Django_Django-REST-Framework_Angular.git
cd reactiveForms
docker-compose build
```

Secondly execute the containers.

```bash
docker-compose up
```

Open in your browser

http://localhost/

## Django test locally

To run the Django test use the below command, but you must clone and build the container first.

```bash
docker-compose run --rm dj python manage.py test
```

## Angular test locally

To run the Angular test you must move to the directory and install the node dependencies.

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

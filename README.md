# Sapper Django Template

## How to use

### Prepare

First you need add two files, .env.dev and .env.prod. These files should contains bellow key pairs.

.env.dev

```env
    POSTGRES_USER=django
    POSTGRES_PASSWORD=helloworld
    POSTGRES_DB=django_dev
    DEBUG=1
    SECRET_KEY=secret
    DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
    SQL_ENGINE=django.db.backends.postgresql
    SQL_DATABASE=django_dev
    SQL_USER=django
    SQL_PASSWORD=helloworld
    SQL_HOST=postgres
    SQL_PORT=5432
    DATABASE=postgres
    API_SERVER_URL=http://django:8000/api/article
    API_CLIENT_URL=http://localhost:8000/api/article
```

.env.prod

```env
    POSTGRES_USER=django
    POSTGRES_PASSWORD=helloworld
    POSTGRES_DB=django_prod
    DEBUG=0
    SECRET_KEY=secret
    DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
    SQL_ENGINE=django.db.backends.postgresql
    SQL_DATABASE=django_prod
    SQL_USER=django
    SQL_PASSWORD=helloworld
    SQL_HOST=postgres
    SQL_PORT=5432
    DATABASE=postgres
```

### Development

1. Build the images and run the containers:

    docker-compose up -d --build

2. Create the databse

    docker-compose exec postgres psql --username=django --dbname=django_dev

3. Run the migrations:

    docker-compose exec django python manage.py migrate --noinput

4. Test it out at [http://localhost:3000](http://localhost:3000) and [http://localhost:8000/admin](http://localhost:8000/admin).

5. Bring down the containers(and the associated volumes with the -v flag):

    docker-compose down -v

### Production

1. Build the images and run the containers:

    docker-compose -f docker-compose.prod.yml up -d --build

2. Run the migrations:

    docker-compose -f docker-compose.prod.yml exec django python manage.py migrate --noinput

3. Move static files to staticfiles folder:

    docker-compose -f docker-compose.prod.yml exec django python manage.py collectstatic --no-input --clear

4. Test it out at [http://localhost:1337](http://localhost:1337).

5. Bring down the containers(and the associated volumes with the -v flag):

    docker-compose -f docker-compose.prod.yml down -v

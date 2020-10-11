# Sapper Django Template

## How to use

### Development

1. Build the images and run the containers:

    docker-compose up -d --build

2. Create the databse

    docker-compose exec postgres psql --username=django --dbname=django_dev

3. Run the migrations:

    docker-compose exec django python manage.py migrate --noinput

4. Test it out at [http://localhost:3000](http://localhost:3000) and [http://localhost:8000](http://localhost:8000).

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

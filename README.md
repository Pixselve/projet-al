<h1 align="center">Software architecture project</h1>
<h4 align="center">Mael KERICHARD (@Pixselve) - Romain BRIEND (@Yami2200)</h4>
<p align="center">
   <img src="https://img.shields.io/badge/-ESIR-orange" alt="ESIR">
</p>

---

![](http://www.plantuml.com/plantuml/svg/TL9DhzCm4BpxLwnyWaDVRnmGgXwF3reWA26zHJriaqsnwjYLFw0Iuh-piGHnApyfXtXcFJCU-z47T25EMeWNBq5kz_iQrXBGGuNAx4mWDs9F7wxyewmJmjY1G2R2e0P3uPTrPmc_XHWmu14zGMrzE3bgcwzYaKsYJzYVjo5SRj6FpfgGOD5z8ny-jscGp720rMhPnEn9cUiCRlwZy1ha6YzgBNE-73yNM5nPODaCdjnFPKumpZJuW47rC2fDFkdcMR_ZyQX2rIH2lgsQ6cfdXzYJaqNsdJK-JimM3xgvroWFvUrsJKHtZXucrJkRelUqQEME7JUYq-d8fKXjjQ-V4tXus2IUgsdP66ZYpLx-ktvEo8tCBI6JskAm2foKWVaXGFV9uOW6ausiezOmlmqfyWMyORBRcL77w_kdGu5Zbud23uh-8CJDQFVbLJfa3kRpcJ4ZJlKS_MwTBExxBGuj5rccImtc6SilyO-OlqTsZPF-2m00)

## 💻 How to use

### 🔧 Development :

For development, the docker containers for front & back will use the files from your development environment, in order to start the configured docker compose file, you need this directory structure :
```
📦
│   📜 README.md
│   📜 compose-dev.yaml    
└─── 📂 frontend
│   │   📂 src
│   │   📜 package.json
│   │   📜 dev.Dockerfile
│   │   ...
└─── 📂 backend
│   │   📂 src
│   │   📜 package.json
│   │   📜 dev.Dockerfile
│   │   ...
```

Then you can run the docker-compose file :

```bash
docker-compose -f compose-dev.yaml up
```

If you also want to enable **monitoring** in development, run the following command instead :

```bash
docker-compose -f compose-dev.yaml --profile monitoring up
```

The backend will be available on http://localhost:3000.

The frontend will be available on http://localhost:4200.

The SMTP client will be available on http://localhost:1080.

(If enabled) The monitoring will be available on http://localhost:3001.

### 💼 Production :

You can run the docker-compose file with standard profile with this command:

```bash
docker-compose -f compose.yaml --profile standard up
```

If you want to enable **monitoring** in production, run the following command instead :

```bash
docker-compose -f compose.yaml --profile monitoring up
```


The backend will be available on http://localhost/api.

The frontend will be available on http://localhost.

The SMTP client will be available on http://localhost/mail.

(If enabled) The monitoring will be available on http://localhost/monitoring.

## 📝 Configuration :

You can configure the application by editing the environment variables in the docker-compose file.

### Backend config :

| Name                 | Value                                                                        | Example                          | Required |
|----------------------|------------------------------------------------------------------------------|----------------------------------|----------|
| `DB_HOST`            | The host of the database. It should be a PostgreSQL database.                | 127.0.0.1                        | ✅        |
| `DB_USERNAME`        | The username of the database.                                                | postgres                         | ✅        |
| `DB_PASSWORD`        | The password of the database.                                                | postgres                         | ✅        |
| `DB_DATABASE`        | The name of the database.                                                    | postgres                         | ✅        |
| `DEFAULT_USER_EMAIL` | If the database is empty, a default user with this email will be created.    | admin@administration.fr          | ✅        |
| `DEFAULT_USER_PASS`  | If the database is empty, a default user with this password will be created. | admin                            | ✅        |
| `RABBITMQ_URL`       | The url pointing to a RabbitMQ instance.                                     | amqp://guest:guest@rabbitmq:5672 | ❌        |

### Quarkus config :

| Name                | Value                                         | Example  | Required |
|---------------------|-----------------------------------------------|----------|----------|
| `RABBITMQ_USERNAME` | The username of the RabbitMQ instance.        | guest    | ✅        |
| `RABBITMQ_PASSWORD` | The password of the RabbitMQ instance.        | guest    | ✅        |
| `RABBITMQ_HOST`     | The host address of the RabbitMQ instance.    | rabbitmq | ✅        |
| `RABBITMQ_PORT`     | The port of the RabbitMQ instance.            | 5672     | ✅        |
| `RABBITMQ_PORT`     | The host address of the SMTP server instance. | smtp     | ✅        |

### Database config :

| Name                | Value                                    | Example  | Required |
|---------------------|------------------------------------------|----------|----------|
| `POSTGRES_PASSWORD` | The passowrd of the PostgreSQL instance. | postgres | ✅        |

## 🚛 Load Testing the backend

### How to run

1. Start the project

    ```bash
    docker-compose up
    ```

2. Start the grafana dashboard and the influxdb database

    ```bash
    cd load-testing
    docker-compose up -d grafana influxdb
    ```

3. Run the load test

    ```bash
    cd load-testing
    docker-compose run --rm k6 run /scripts/all.js
    ```

### Results

The results are available on the grafana dashboard at [http://localhost:3000](http://localhost:3000).
The credentials are `admin` / `admin`.

![img.png](docs/grafana-dashboard-load-testing.png)

## 📟 Monitoring

The global architecture is monitored with [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/).

Example of NestJS dashboard :

![Grafana nest JS](docs/grafana-dashboard-nestjs.png)

The following services are monitored (each one in a specific dashboard) :

- Backend NestJS
- Backend Quarkus
- RabbitMQ

The monitoring results are available (if enabled) on grafana at [http://localhost:3001](http://localhost:3001) or [http://localhost/monitoring](http://localhost/monitoring).

## 🔗 Individual repositories

- [Backend NestJS](https://github.com/pixselve-school/tp1-wm)
- [Frontend Angular](https://github.com/pixselve-school/wm-projet)
- [Quarkus Microservice](https://github.com/pixselve-school/quarkus-wm-project)


## 🏠 Architecture

1. The front-end of the application is served by a static file server.
2. The back-end of the application is handled by a NestJS service, which communicates with a PostgreSQL database to
   store data, uses an AMQP message queue to send messages asynchronously, and exposes metrics to Prometheus.
3. Quarkus Microservice is consuming messages from an AMQP queue and sending emails using SMTP protocol, and exposes
   metrics to Prometheus..
4. Nginx is used as reverse proxy and load balancer directing incoming requests to the appropriate internal service.
5. The system is monitored and profiled by a combination of Grafana, InfluxDB, and Prometheus, and load tested using K6
6. The system include rabbitmq as message queue, which allows the NestJS service to send messages asynchronously to the
   Quarkus microservice.

There are many different choices we could make to change the architecture, depending on the specific requirements of
the application and our goals. Here are a few examples:

1. Instead of using NestJS, you could choose a different web framework, such as Express.js for Node.js or Flask for
   Python.
2. If you don't need the full power of a relational database, you could use a different type of database, such as
   MongoDB
3. or Cassandra, which are better suited for certain types of data or workloads.
4. If you don't need the complexity of an AMQP message queue, you could use a simpler messaging solution, such as Redis
   or
5. Kafka.
6. For load balancing and proxy you could use different software, HAProxy, Traefik or Envoy,
7. You could use a different language for the backend, such as Go or Java.
8. You could use different tools for monitoring and profiling, such as Elastic Stack, or Datadog.
9. You could change the load testing tool, Apache JMeter, Gatling or Artillery

We use a hybrid architecture, which is a combination of microservices and monolithic.
We could have broken down the backend into smaller pieces, such as a separate service for authentication, or a separate
service for users, associations, etc. However, we decided to keep it simple and use a single backend service for all.

### Why NestJS ?

Using NestJS for the backend service: NestJS is a popular and powerful framework for building scalable and maintainable
server-side applications using Node.js. Nest provides a powerful set of tools and features such as built-in support for
TypeScript, modular architecture, and decorators, which makes it a good choice for building a large and complex backend.

### Why PostgreSQL ?

Using PostgreSQL for the database: PostgreSQL is a powerful and feature-rich relational database management system that
is well-suited for complex, data-intensive applications. It has a wide range of features for data integrity and
security, supports robust SQL querying, and is compatible with many different programming languages.

### Why RabbitMQ ?

Using RabbitMQ for messaging: RabbitMQ is a popular, high-performance message queueing system that provides robust
support for sending and receiving messages asynchronously. This allows the backend service to offload some of its
workload and improve scalability and responsiveness.

### Why Nginx ?

Using Nginx as reverse proxy and load balancer: Nginx is a lightweight and high-performance web server and reverse
proxy. It is known for its low resource usage and ability to handle large amounts of concurrent connections, making it
well-suited for use as a reverse proxy and load balancer in a microservices architecture.

### Why  Grafana, InfluxDB, Prometheus and K6 ?

Using Grafana, InfluxDB, Prometheus for monitoring and profiling and K6 for load testing: These tools are popular and
powerful choices for monitoring, profiling and load testing. They provide a wide range of features and support various
data formats, allowing for granular and detailed analysis of the performance and behavior of the system.


## 🔗 What services are implemented ?

Here is a list of all the services implemented in this project:

* NestJS Backend
* PostgreSQL
* RabbitMQ
* Nginx
* Quarkus microservice
* Mail server
* Grafana
* InfluxDB
* Prometheus
* K6


It's worth to mention that :

* Nginx is acting as reverse proxy, load balancer, and front static files server
* The Quarkus microservice is responsible for consuming messages from AMQP queue and sending emails via SMTP
* The monitoring and profiling services such as Grafana, InfluxDB, Prometheus and load testing service (K6) are being used to monitor and optimize the performance of the system.

### Services Status :

| Service        | Status                              |
|----------------|-------------------------------------|
| NestJS Backend | Implemented, Monitored, Load tested |
| PostgreSQL     | Implemented                         |
| RabbitMQ       | Implemented, Monitored              |
| Nginx          | Implemented                         |
| Quarkus        | Implemented, Monitored              |
| Mail server    | Implemented                         |
| Grafana        | Implemented                         |
| InfluxDB       | Implemented                         |
| Prometheus     | Implemented                         |
| K6             | Implemented                         |

## 🔒 What you have done to ensure the minimal number of ports are exposed in production, that your services are protected, etc.

The only port exposed to the outside world is the port 80, which is used by Nginx as a reverse proxy and load balancer. 

Nginx is configured to forward requests to the appropriate internal service based on the URL path.

The only way to access the services via the outside world is through Nginx, which is the only service exposed to the
outside world.

## 🎇 Additional features :

First, we have implemented an email verification process when creating a user account. 
This ensures that only legitimate users can access the account. 
When you create a new account, you will receive an email with a verification link. 
Once you click the link, your email address will be verified, and you will be able to log in to your account.

Second, we have added the ability to create and delete events in the association detail page.
Additionally, when an event is created, a notification email will be sent with an attached .ics file. 
This file can be imported into your calendar app, allowing you to add the event to your personal calendar.

## 📋 AL Feedback :

Overall, the computer science project was an interesting and enriching experience. We had the feeling that we were learning something new, compared to other academic subjects. The project was interesting to implement, though some instructions were not clear, and some instructions were asked verbally, leaving us uncertain as to whether we had to follow them or not.

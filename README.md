# Software architecture project
## Mael KERICHARD (@Pixselve) - Romain BRIEND (@Yami2200)

```mermaid
flowchart
backend --> db[PostgreSQL]
backend --> RabbitMQ
RabbitMQ --> microservice[Quarkus Microservice to send emails]
Nginx -- 80-443:3000 --> backend
microservice -- Send emails --> SMTP

K6 -. Load testing .-> Nginx

K6 --> InfluxDB --> Grafana
```


## 💻 How to use

```bash
docker-compose up
```

The backend will be available on http://localhost:80.
The SMTP client will be available on http://localhost:1080.

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

![img.png](docs/grafana dashboard.png)

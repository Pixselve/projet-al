<h1 align="center">Software architecture project</h1>
<h4 align="center">Mael KERICHARD (@Pixselve) - Romain BRIEND (@Yami2200)</h4>
<p align="center">
   <img src="https://img.shields.io/badge/-ESIR-orange" alt="ESIR">
</p>

---

![](http://www.plantuml.com/plantuml/svg/TL9DhzCm4BpxLwnyWaDVRnmGgXwF3reWA26zHJriaqsnwjYLFw0Iuh-piGHnApyfXtXcFJCU-z47T25EMeWNBq5kz_iQrXBGGuNAx4mWDs9F7wxyewmJmjY1G2R2e0P3uPTrPmc_XHWmu14zGMrzE3bgcwzYaKsYJzYVjo5SRj6FpfgGOD5z8ny-jscGp720rMhPnEn9cUiCRlwZy1ha6YzgBNE-73yNM5nPODaCdjnFPKumpZJuW47rC2fDFkdcMR_ZyQX2rIH2lgsQ6cfdXzYJaqNsdJK-JimM3xgvroWFvUrsJKHtZXucrJkRelUqQEME7JUYq-d8fKXjjQ-V4tXus2IUgsdP66ZYpLx-ktvEo8tCBI6JskAm2foKWVaXGFV9uOW6ausiezOmlmqfyWMyORBRcL77w_kdGu5Zbud23uh-8CJDQFVbLJfa3kRpcJ4ZJlKS_MwTBExxBGuj5rccImtc6SilyO-OlqTsZPF-2m00)

## 💻 How to use

```bash
docker-compose up
```

The backend will be available on http://localhost/api.
The frontend will be available on http://localhost.
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

## 📟 Monitoring

The global architecture is monitored with [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/).

Example of NestJS dashboard :

![Grafana nest JS](docs/grafana-dashboard-nestjs.png)

The following services are monitored (each one in a specific dashboard) :

- Backend NestJS
- Backend Quarkus
- RabbitMQ

The monitoring results are available on grafana at [http://localhost:3001](http://localhost:3001).

## 🔗 Individual repositories

- [Backend NestJS](https://github.com/pixselve-school/tp1-wm)
- [Frontend Angular](https://github.com/pixselve-school/wm-projet)
- [Quarkus Microservice](https://github.com/pixselve-school/quarkus-wm-project)

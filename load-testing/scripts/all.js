import http from "k6/http";
import {baseUrl} from "./utils.js";
import {check, sleep, group} from "k6";

export const options = {
    stages: [
        {duration: '30s', target: 20},
        {duration: '1m30s', target: 10},
        {duration: '20s', target: 0},
    ],
};


export default function (data) {
    group("home", function () {
        let req, res;
        req = [{
            "method": "get",
            "url": baseUrl + "/",
        }];
        res = http.get(baseUrl + "/");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });

    group("associations", function () {
        let req, res;
        req = [{
            "method": "get",
            "url": baseUrl + "/",
        }];
        res = http.get(baseUrl + "/associations");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });

    group("roles", function () {
        let req, res;
        req = [{
            "method": "get",
            "url": baseUrl + "/",
        }];
        res = http.get(baseUrl + "/roles");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });

    group("events", function () {
        let req, res;
        req = [{
            "method": "get",
            "url": baseUrl + "/",
        }];
        res = http.get(baseUrl + "/events");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });

    group("minutes", function () {
        let req, res;
        req = [{
            "method": "get",
            "url": baseUrl + "/",
        }];
        res = http.get(baseUrl + "/minutes");
        check(res, {
            "status is 200": (r) => r.status === 200,
        });
        sleep(0.02);
    });
}

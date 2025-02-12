import http from 'k6/http';
import { check, sleep } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data)
    };
}

export const options = {
    vus: 10,
    duration: '5s'
};

export default function () {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';

    const res = http.get(url);

    check(res, {
        'status é 200': (r) => r.status === 200,
        'o corpo não está vazio': (r) => r.body.length > 0
    });

    sleep(1);
}
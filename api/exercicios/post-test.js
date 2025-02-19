import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 20,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95) < 500'], // 95% das requisições abaixo de 500ms
        http_req_failed: ['rate<0.01']     // Taxa de falhas deve ser inferior a 1%
    }
}

export default function () {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    const payload = JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
    });

    const params = {
        headers: {
        'Content-Type': 'application/json; charset=UTF-8'
        }
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Status code é 201': (r) => r.status === 201
    });
}
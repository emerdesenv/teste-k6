import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 20,           // Quantidade de usuários simultâneos
    duration: '30s',   // Duração do teste
    thresholds: {
        http_req_duration: ['p(95) < 500'], // 95% das requisições devem ficar abaixo de 500ms
        http_req_failed: ['rate<0.01']     // Taxa de falhas deve ser inferior a 1%
    }
}

export default function () {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const res = http.get(url);

    check(res, {
        'Status code é 200': (r) => r.status === 200
    });
}
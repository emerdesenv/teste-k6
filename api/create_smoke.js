import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 5, // Apenas 5 usuários simultâneos (teste leve)
    duration: '10s', // Roda por apenas 10 segundos
    thresholds: {
        http_req_failed: ['rate<0.01'], // Falha abaixo de 1%
        http_req_duration: ['p(95)<800'] // 95% das requisições abaixo de 800ms
    }
}

export default function () {
    let res = http.get('https://jsonplaceholder.typicode.com/posts/1');

    // Validações rápidas
    check(res, {
        'Status é 200': (r) => r.status === 200,
        'Tempo de resposta < 800ms': (r) => r.timings.duration < 800,
    });

    sleep(1);
}
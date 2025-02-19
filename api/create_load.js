import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 50 },  // Sobe para 50 usuários em 30s
        { duration: '1m', target: 100 },  // Aumenta para 100 usuários em 1 minuto
        { duration: '2m', target: 200 },  // Mantém 200 usuários por 2 minutos
        { duration: '1m', target: 100 },  // Reduz para 100 usuários em 1 minuto
        { duration: '30s', target: 50 }  // Diminui para 50 usuários em 30s
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% das requisições devem ser < 1s
        http_req_failed: ['rate<0.02']    // Menos de 2% de falhas são aceitáveis
    }
}

export default function () {
    let res = http.get('https://jsonplaceholder.typicode.com/posts');

    // Validações
    check(res, {
        'Status é 200': (r) => r.status === 200,
        'Tempo de resposta < 1000ms': (r) => r.timings.duration < 1000,
    });

    sleep(1); // Simula tempo entre as requisições
}
import http from 'k6/http';
import { check, sleep } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export const options = {
    vus: 1, // Número de usuários virtuais simultâneos
    duration: '1m', // Duração do teste,
    http_req_duration: ['p(90)<2000'] // 90% das requisições devem respondem em até 2 segundos
};

export default function () {
    const url = 'http://localhost:3000/api/carros';

    const payload = JSON.stringify({
        marca: 'Chevrolet',
        modelo: 'Celta',
        ano: 2012
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res = http.post(url, payload, params);

    // Verifica se a resposta foi bem-sucedida
    check(res, {
        'status é 201': (r) => r.status === 201,
        'tem ID inserido': (r) => JSON.parse(r.body)._id !== undefined
    });

    // Pausar 1 segundo antes da próxima requisição
    sleep(1);
}
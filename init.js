import http from 'k6/http';
import { sleep, check } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

export const options = {
    vus: 10, // Número de usuários virtuais simultâneos
    duration: '5s', // Duração do teste,
    thresholds: {
        http_req_duration: ['p(90)<2000'] // 90% das requisições devem respondem em até 2 segundos
    }
};

export default function () {
    const resquest = http.get('http://test.k6.io');

    check(resquest, {
        'Status deve ser 200': (resquest) => resquest.status === 200
    });

    sleep(1);
}
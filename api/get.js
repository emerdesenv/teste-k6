import http from 'k6/http';
import { check, sleep } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}

// URL do endpoint GET
const BASE_URL = 'http://localhost:3000/api/carros';

export const options = {
    vus: 5, // Número de usuários virtuais
    duration: '5s' // Duração do teste
};

export default function () {
    const userId = '6787bf67b93a19fd4a2ba2f6'; // Substitua com um ID válido do seu banco
    
    // Enviar requisição DELETE para deletar o teste
    const res = http.get(`${BASE_URL}/${userId}`);

    // Verificar se o status da resposta é 200
    check(res, {
        'status é 200': (r) => r.status === 200
    });

    // Pausar 1 segundo antes da próxima requisição
    sleep(1);
}
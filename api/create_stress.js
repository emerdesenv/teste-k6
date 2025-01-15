import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10m', target: 200 }, // aumento de tráfego de 1 para 200 usuários em 10 minutos.
        { duration: '30m', target: 200 }, // fique com mais de 200 usuários por 30 minutos
        { duration: '5m', target: 0 }, // redução para 0 usuários
    ]
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
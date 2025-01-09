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
    const url = 'http://localhost:3000/insert'; // URL da sua API

    const payload = JSON.stringify({
        nome: 'Teste',
        cidade: 'Joinville',
        estado: 'SC',
        idade: Math.floor(Math.random() * 100) // Dados aleatórios para inserir
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
        'tem ID inserido': (r) => JSON.parse(r.body).insertedId !== undefined
    });

    // Pausar 1 segundo antes da próxima requisição
    sleep(1);
}
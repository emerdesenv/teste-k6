import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10, // Número de usuários virtuais simultâneos
    duration: '30s' // Duração do teste
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
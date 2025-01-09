import http from 'k6/http';
import { check } from 'k6';

// URL do endpoint PUT
const BASE_URL = 'http://localhost:3000/update'; // Substitua pelo seu endereço

export const options = {
  vus: 5, // Número de usuários virtuais
  duration: '10s', // Duração do teste
};

export default function () {
    // Substitua pelo ID real de um documento no MongoDB
    const userId = '678013ceb14baab9c254c9d9';

    // Dados para atualização
    const payload = JSON.stringify({
        nome: 'Atualizado pelo K6'
    });

    // Cabeçalhos da requisição
    const headers = { 'Content-Type': 'application/json' };

    // Requisição PUT
    const res = http.put(`${BASE_URL}/${userId}`, payload, { headers });

    // Verificar a resposta
    check(res, {
        'status é 200': (r) => r.status === 200
    });
}
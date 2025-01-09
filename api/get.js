import http from 'k6/http';
import { check, sleep } from 'k6';

// URL do endpoint GET
const BASE_URL = 'http://localhost:3000/find'; // Modifique conforme sua configuração

export const options = {
    vus: 5, // Número de usuários virtuais
    duration: '10s' // Duração do teste
};

export default function () {
    // Enviar requisição GET para listar todos os registros
    const res = http.get(BASE_URL);

    // Verificar se o status da resposta é 200
    check(res, {
        'status é 200': (r) => r.status === 200,
        'resposta é um array': (r) => Array.isArray(r.json()),
        'conteúdo não está vazio': (r) => r.json().length > 0,
    });

    // Logar a resposta para depuração (opcional)
    //console.log(`Resposta: ${res.body}`);

    // Pausar 1 segundo antes da próxima requisição
    sleep(1);
}
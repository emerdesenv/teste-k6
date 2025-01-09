import http from 'k6/http';
import { check, sleep } from 'k6';

// URL do endpoint de deletação
const BASE_URL = 'http://localhost:3000/delete'; // Modifique conforme sua configuração

export const options = {
    vus: 1, // Número de usuários virtuais
    duration: '2s' // Duração do teste
};

export default function () {
    // ID do teste a ser deletado
    const userId = '678013ceb14baab9c254c9d9'; // Substitua com um ID válido do seu banco

    // Enviar requisição DELETE para deletar o teste
    const res = http.del(`${BASE_URL}/${userId}`);

    console.log(res);

    // Verificar se o status da resposta é 200 (deletado com sucesso)
    check(res, {
        'status é 200': (r) => r.status === 200
    });

    // Pausar 1 segundo antes da próxima requisição
    sleep(1);
}
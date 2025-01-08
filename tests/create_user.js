import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    const url = 'https://serverest.dev/usuarios';

    const payload = JSON.stringify({
        nome: 'Teste', 
        email: 'teste@gmail.com', 
        password: 'pwd123', 
        administrador: 'true'
    });

    const headers = {
        'headers': {
            'Contet-Type': 'application/json'
        }
    }

    const resquest = http.post(url, payload, headers);

    check(resquest, {
        'Status deve ser 200': (resquest) => resquest.status === 200
    });

    sleep(1);
}
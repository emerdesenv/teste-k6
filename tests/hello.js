import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    const resquest = http.get('http://test.k6.io');

    check(resquest, {
        'Status deve ser 200': (resquest) => resquest.status === 200
    });

    sleep(1);
}
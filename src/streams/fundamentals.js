// Netflix? Spotify?
// Ler pequenas partes e já conseguir ler os dados sem ver por completo

// Ex. Importação de clientes
// CSV >POST /upload-client.csv
// Readable > ReadableStream (Lendo aos poucos)
// Writable > WritableStream (Enviando aos poucos)


// Conectar as streams
// process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const index = this.index++;

        setTimeout(() => {
            if (index > 100) {
                this.push(null);
                return;
            }
            const buf = Buffer.from(String(index));

            this.push(buf);
        }, 1500);
    }
}

new OneToHundredStream().pipe(process.stdout)

class MultiplyByTenStream extends Writable {
    // CHUNK é BUFFER
    _write(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * 10;

        // console.log(transformed);

        callback();
    }
}
   

class InverseNumbersStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        console.log(transformed);

        callback(null, Buffer.from(String(transformed)));
    }
}

new OneToHundredStream()
    .pipe(new InverseNumbersStream())
    .pipe(new MultiplyByTenStream())
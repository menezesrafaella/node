import fs from 'node:fs';
// referenciar o arquivo 
// import.meta.url retorna o caminho relativo inteiro do database

const databasePath = new URL('../db.json', import.meta.url);


export class Database { 
    #database = {};

    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        });
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {	
        let data = this.#database[table] ?? [];

        if(search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value).toLowerCase();
                })
            })
        }

        return data;
    }


    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();

        return data;
    }

    update(table,id,data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        // retorna -1 caso não encontre o índice
        if(rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data };
            this.#persist();
            return this.#database[table][rowIndex];
        } else {
            throw new Error('Row not found');
        }
    }


    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        // retorna -1 caso não encontre o índice
        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        } else {
            throw new Error('Row not found');
        }
    }
}
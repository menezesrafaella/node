import fs from 'node:fs';
// referenciar o arquivo 
// import.meta.url retorna o caminho relativo inteiro do database

const databasePath = new URL('../db.json', import.meta.url);


export class Database { 
    #database = {};

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {	
        const data = this.database[table] ?? [];

        return data;
    }


    insert(table, data) {
        if(Array.isArray(this.database[table])) {
            this.database[table].push(data);
        } else {
            this.database[table] = [data];
        }

        return data;
    }
}
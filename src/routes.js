import { Database } from './streams/database';
import { randomUUID } from 'node:crypto';
import { builRoutePath } from './utils/build-route-path';

const database = new Database();

//Request body, Route parameters, Query parameters

export const routes = [
    {
        method: 'GET',
        path: builRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query;
            const users = database.select('users', search ? {
                email: search,
                name: search
            } : null)


            return res.end(JSON.stringify(users))

        }
    },
    {
        method: 'POST',
        path: builRoutePath('/users'),
        handler: (req, res) => {
            const users = { 
                id: randomUUID(),
                name: 'John Doe', 
                email: 'john@example.com'
            }
            database.insert('users', users)
            return res.writeHead(201).end()
        }
    }, {
        method: 'DELETE',
        path: builRoutePath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params;
            try {
                database.delete('users', id);
                return res.writeHead(204).end();
            } catch (error) {
                return res.writeHead(404).end(JSON.stringify({ message: error.message }));
            }
        }
    },
        {
            method: 'PUT',
            path: builRoutePath('/users/:id'),
            handler: (req, res) => {
                const {id} = req.params;
                try {
                    database.update('users', id, {
                        name,
                        email
                    });
                    return res.writeHead(204).end();
                } catch (error) {
                    return res.writeHead(404).end(JSON.stringify({ message: error.message }));
                }
            }
    }
]
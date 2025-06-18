import { Database } from './streams/database';
import { randomUUID } from 'node:crypto';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/users',
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
        path: '/users/:id',
        handler: (req, res) => {
            const { id } = req.params;
            const users = database.select('users');
            const filteredUsers = users.filter(user => user.id !== id);
            database.insert('users', filteredUsers);
            return res.writeHead(204).end();
        }
    }
]
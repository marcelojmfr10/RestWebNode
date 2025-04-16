import { Request, Response } from "express"

const todos = [
    {id: 1, text: 'buy milk', createdAt: new Date()},
    {id: 2, text: 'buy bread', createdAt: null},
    {id: 3, text: 'buy butter', createdAt: new Date()},
];

export class TodosController {

    //* DI
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);

        return;
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({error: `ID argument is not a number`});

        const todo = todos.find(todo => todo.id === id);
        
        (todo) ? res.json(todo) : res.status(400).json({
            error: `Todo with id ${id} not found`
        })

        
    }
}
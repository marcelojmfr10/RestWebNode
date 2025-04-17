import { Request, Response } from "express"
import { prisma } from "../../data/postgres";

export class TodosController {

    //* DI
    constructor() {

    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        res.json(todos);

        return;
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ error: `ID argument is not a number` });
            return;
        }

        const todo = await prisma.todo.findFirst({ where: { id } });

        (todo) ? res.json(todo) : res.status(400).json({
            error: `Todo with id ${id} not found`
        });
    }

    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) {
            res.status(400).json({ error: `text property is required` });
            return;
        }

        const todo = await prisma.todo.create({
            data: { text }
        });

        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ error: `ID argument is not a number` });
            return;
        }

        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) {
            res.status(400).json({ error: `Todo with id ${id} not found` });
            return;
        }

        const { text, completedAt } = req.body;
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                text,
                completedAt: (completedAt) ? new Date(completedAt) : null
            }
        });

        res.json(updatedTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ error: `ID argument is not a number` });
            return;
        }

        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) {
            res.status(400).json({ error: `Todo with id ${id} not found` });
            return;
        }

        const deleted = await prisma.todo.delete({
            where: { id }
        });

        (deleted) ? res.json(deleted) : res.status(400).json({ error: `Todo with id ${id} not found` });

    }
}
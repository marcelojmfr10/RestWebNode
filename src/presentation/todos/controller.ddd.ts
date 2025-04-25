import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {

    //* DI
    constructor(private readonly todoRepository: TodoRepository) {

    }

    public getTodos = async (req: Request, res: Response) => {
        // const todos = await prisma.todo.findMany();
        // res.json(todos);

        const todos = await this.todoRepository.getAll();
        res.json(todos);

        return;
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        
        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
            
        } catch (error) {
            res.status(400).json({error});
        }

        // if (isNaN(id)) {
        //     res.status(400).json({ error: `ID argument is not a number` });
        //     return;
        // }

        // const todo = await prisma.todo.findFirst({ where: { id } });

        // (todo) ? res.json(todo) : res.status(400).json({
        //     error: `Todo with id ${id} not found`
        // });
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({error});
            return;
        }

        const todo = await this.todoRepository.create(createTodoDto!);
        res.json(todo);

        // const todo = await prisma.todo.create({
        //     data: createTodoDto!
        // });

        // res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id
        });

        if (error){
            res.status(400).json({error});

            return;
        }

        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
        res.json(updatedTodo);

        // const todo = await prisma.todo.findFirst({ where: { id } });

        // if (!todo) {
        //     res.status(404).json({ error: `Todo with id ${id} not found` });
        //     return;
        // }

        // const updatedTodo = await prisma.todo.update({
        //     where: { id },
        //     data: updateTodoDto!.values
        // });

        // res.json(updatedTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json(deletedTodo);

        // if (isNaN(id)) {
        //     res.status(400).json({ error: `ID argument is not a number` });
        //     return;
        // }

        // const todo = await prisma.todo.findFirst({ where: { id } });

        // if (!todo) {
        //     res.status(400).json({ error: `Todo with id ${id} not found` });
        //     return;
        // }

        // const deleted = await prisma.todo.delete({
        //     where: { id }
        // });

        // (deleted) ? res.json(deleted) : res.status(400).json({ error: `Todo with id ${id} not found` });

    }
}
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { failResponseHandler } from "App/Services/ResponseHandlerService";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  indexTodo,
  updateTodo,
} from "App/Services/TodosServices";
import CreateTodoValidator from "App/Validators/CreateTodoValidator";
import UpdateTodoValidator from "App/Validators/UpdateTodoValidator";

const CONTROLLER_NAME = "TodosController";
const MODEL_NAME = "Todo";

export default class TodosController {
  public async index({ request }: HttpContextContract) {
    try {
      const page = request.input("page", 1);
      const page_size = request.input("page_size", 30);

      return await indexTodo(page, page_size);
    } catch (e) {
      return await failResponseHandler(
        `${MODEL_NAME} index failed`,
        `${CONTROLLER_NAME} index error:`,
        e
      );
    }
  }

  public async create({ request }: HttpContextContract) {
    try {
      const data = await request.validate(CreateTodoValidator);
      return await createTodo(data);
    } catch (e) {
      return await failResponseHandler(
        `${MODEL_NAME} create not Successfully`,
        `${CONTROLLER_NAME} create error:`,
        e
      );
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const data = await getTodoById(params.id);
      return response.json(data);
    } catch (e) {
      return failResponseHandler(
        `${MODEL_NAME} id data not found`,
        `${CONTROLLER_NAME} show error:`,
        e
      );
    }
  }

  public async update({ request, params }: HttpContextContract) {
    try {
      const validateData = await request.validate(UpdateTodoValidator);
      return await updateTodo(params.id, validateData);
    } catch (e) {
      return failResponseHandler(
        `Update ${MODEL_NAME} Failed`,
        `${CONTROLLER_NAME} update error:`,
        e
      );
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      return await deleteTodo(params.id);
    } catch (e) {
      return failResponseHandler(
        `Delete ${MODEL_NAME} Failed`,
        `${CONTROLLER_NAME} destroy error:`,
        e
      );
    }
  }
}

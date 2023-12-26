import Todo from "App/Models/Todo";
import {
  failResponseHandler,
  successResponseHandler,
} from "./ResponseHandlerService";

const SERVICE_NAME = "TodosService";

export const indexTodo = async (
  page: number = 1,
  page_size: number = 30,
  status?: null
) => {
  try {
    let allTodos: any = Todo.query();

    if (status !== null) {
      allTodos = allTodos.where("status", status === "true" ? 1 : 0);
    }

    allTodos = await allTodos.paginate(page, page_size);

    return await successResponseHandler("Todo Data", {
      todos: allTodos?.all(),
      count: allTodos.length,
      total_count: allTodos.total,
      total_page_count: allTodos.lastPage,
      page: allTodos.currentPage,
      page_size: allTodos.perPage,
    });
  } catch (e) {
    return failResponseHandler(
      "Fetching Todo Data failed",
      `${SERVICE_NAME} indexTodo error:`,
      e
    );
  }
};

export const createTodo = async (reqData: any) => {
  try {
    const todo = await Todo.create(reqData);
    if (todo) {
      return await successResponseHandler("Todo Created successfully", todo);
    }

    return await failResponseHandler("Error Occurred While creating Todo");
  } catch (e) {
    return failResponseHandler(
      "Todo Created Not Successfully",
      `${SERVICE_NAME} createTodo error:`,
      e
    );
  }
};

export const getTodoById = async (id: number) => {
  try {
    const todo = await Todo.query().where("id", id).first();
    if (todo) {
      return successResponseHandler(`Todo with id:${id}`, todo);
    }

    return await failResponseHandler(`Todo with id:${id} does not exist`);
  } catch (e) {
    return await failResponseHandler(
      `Todo with id:${id} does not exist`,
      `${SERVICE_NAME} getTodoById error:`,
      e
    );
  }
};

export const updateTodo = async (id: number, data: any) => {
  try {
    let reqData: any;
    const todo = await getTodoById(id);
    if (!todo) {
      return await failResponseHandler(`Todo with id:${id} does not exist`);
    }
    reqData = todo.data;
    let todos = await reqData!.merge(data).save();

    return await successResponseHandler(
      "Todo Data Updated Successfully",
      todos
    );
  } catch (e) {
    return await failResponseHandler(
      "Todo Data Updated Not Successfully",
      `${SERVICE_NAME} updateTodo error:`,
      e
    );
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const { data: todo } = await getTodoById(id);
    if (!todo) {
      return await failResponseHandler(`Todo with id:${id} does not exist`);
    }

    await todo.delete();
    return await successResponseHandler("Todo Deleted Successfully");
  } catch (e) {
    return await failResponseHandler(
      "Todo Deleted not Successfully",
      `${SERVICE_NAME} deleteTodo error:`,
      e
    );
  }
};

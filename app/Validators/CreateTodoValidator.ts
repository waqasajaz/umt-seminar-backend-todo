import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateTodoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    status: schema.boolean.nullableAndOptional(),
  });

  public messages: CustomMessages = {
    "name.required": "The Name field is required.",
    "description.required": "The Description field is required.",
    "status.boolean": "The Status field must be a boolean.",
  };
}

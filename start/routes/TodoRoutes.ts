import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "TodosController.index");

  Route.post("/", "TodosController.create");
  Route.put("/:id", "TodosController.update");
  Route.delete("/:id", "TodosController.destroy");
  Route.get("/:id", "TodosController.show");
}).prefix("/api/todos");

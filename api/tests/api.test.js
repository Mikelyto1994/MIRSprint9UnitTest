const request = require("supertest");
const app = require("../../index");
const { resetTasks } = require("../task/task.service");
const { resetAssets } = require("../asset/asset.service");

// Estado inicial para las pruebas
const initialTasks = [
  { id: 1, title: "Task 1", description: "Description 1" },
  { id: 2, title: "Task 2", description: "Description 2" },
  { id: 3, title: "Task 3", description: "Description 3" },
];

const initialAssets = [
  { id: "a1", name: "Asset 1", price: 100 },
  { id: "a2", name: "Asset 2", price: 200 },
];

describe("API de Tareas", () => {
  beforeEach(() => {
    resetTasks(); // Restablecer el estado de las tareas
  });

  it("debería obtener todas las tareas", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(initialTasks.length);
  });

  it("debería crear una nueva tarea", async () => {
    const newTask = { title: "Tarea Nueva", description: "Descripción" };
    const response = await request(app).post("/api/tasks").send(newTask);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newTask);
    expect(typeof response.body.id).toBe("number"); // Verifica que el ID sea un número
  });

  it("debería actualizar una tarea existente", async () => {
    const newTask = { title: "Tarea Nueva", description: "Descripción" };
    const createResponse = await request(app).post("/api/tasks").send(newTask);

    const updatedTask = { title: "Tarea Actualizada" };
    const response = await request(app)
      .patch(`/api/tasks/${createResponse.body.id}`)
      .send(updatedTask);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedTask.title);
  });

  it("debería eliminar una tarea existente", async () => {
    const newTask = { title: "Tarea Nueva", description: "Descripción" };
    const createResponse = await request(app).post("/api/tasks").send(newTask);

    const response = await request(app).delete(
      `/api/tasks/${createResponse.body.id}`
    );
    expect(response.statusCode).toBe(204);
  });

  it("debería devolver 404 para una tarea inexistente", async () => {
    const response = await request(app).get("/api/tasks/999");
    expect(response.statusCode).toBe(404);
  });
});

describe("API de Activos", () => {
  beforeEach(() => {
    resetAssets(); // Restablecer el estado de los activos
  });

  it("debería obtener todos los activos", async () => {
    const response = await request(app).get("/api/assets");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(initialAssets.length);
  });

  it("debería crear un nuevo activo", async () => {
    const newAsset = { name: "Activo Nuevo", price: 150 };
    const response = await request(app).post("/api/assets").send(newAsset);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newAsset);
    expect(typeof response.body.id).toBe("string"); // Verifica que el ID sea una cadena
  });

  it("debería actualizar un activo existente", async () => {
    const newAsset = { name: "Activo Nuevo", price: 150 };
    const createResponse = await request(app)
      .post("/api/assets")
      .send(newAsset);

    const updatedAsset = { name: "Activo Actualizado" };
    const response = await request(app)
      .patch(`/api/assets/${createResponse.body.id}`)
      .send(updatedAsset);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedAsset.name);
  });

  it("debería eliminar un activo existente", async () => {
    const newAsset = { name: "Activo Nuevo", price: 150 };
    const createResponse = await request(app)
      .post("/api/assets")
      .send(newAsset);

    const response = await request(app).delete(
      `/api/assets/${createResponse.body.id}`
    );
    expect(response.statusCode).toBe(204);
  });

  it("debería devolver 404 para un activo inexistente", async () => {
    const response = await request(app).get("/api/assets/999");
    expect(response.statusCode).toBe(404);
  });
});

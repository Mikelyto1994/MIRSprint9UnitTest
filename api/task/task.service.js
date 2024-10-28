const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    completed: true,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    completed: false,
  },
];

let nextId = tasks.length + 1;

// Estado inicial para reiniciar tareas
const initialTasks = JSON.parse(JSON.stringify(tasks)); // Hacemos una copia profunda

/**
 * @returns an array of tasks
 */
function getAllTask() {
  return tasks;
}

function getOneTask(id) {
  const task = tasks.find((task) => task.id === Number(id));
  return task || null;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === Number(id));

  if (index === -1) {
    return null;
  }

  const deletedTask = tasks.splice(index, 1)[0];
  return deletedTask;
}

function createTask(task) {
  if (!task.title || !task.description) {
    throw new Error("Title and description are required");
  }

  task.id = nextId++;
  task.completed = false;

  tasks.push(task);
  return task;
}

function updateTask(id, task) {
  const index = tasks.findIndex((t) => t.id === Number(id));

  if (index === -1) {
    return null;
  }

  // Actualiza solo los campos que se proporcionan
  tasks[index] = {
    ...tasks[index],
    ...task,
  };

  return tasks[index];
}

// Función para reiniciar tareas
const resetTasks = () => {
  tasks.length = 0; // Limpiar el arreglo de tareas
  tasks.push(...initialTasks); // Rellenar con tareas iniciales
};

// Exporta las funciones
module.exports = {
  getAllTask,
  getOneTask,
  deleteTask,
  createTask,
  updateTask,
  resetTasks, // Exporta la función de reinicio
};

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el body
app.use(express.json());

// Base de datos en memoria

// Contadores para simular IDs
let projectIdCounter = 2;
let taskIdCounter = 2;
let peopleIdCounter = 2;

// Datos iniciales
let projects = [
    { "id": 1, "name": "Plataforma Educativa", "description": "Sistema de cursos online" }
];

let tasks = [
    { "id": 1, "title": "Diseñar UI", "description": "Pantalla principal", "status": "todo", "projectId": 1, "assignedTo": 1 }
];

let people = [
    { "id": 1, "name": "James Montealegre", "email": "james@correo.com", "role": "Lider Técnico" } // [cite: 23, 24, 25, 26, 27, 28]
];

// Rutas API


// API de proyectos (base: /api/v1/projects)


// GET /api/v1/projects - Lista todos los proyectos
app.get('/api/v1/projects', (req, res) => {
    res.json(projects);
});

// GET /api/v1/projects/:id - Obtiene un proyecto
app.get('/api/v1/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id);
    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: "Proyecto no encontrado" });
    }
});

app.post('/api/v1/projects', (req, res) => {
    const { name, description } = req.body;
    const newProject = {
        id: projectIdCounter++,
        name: name,
        description: description
    };
    projects.push(newProject);
    res.status(201).json({ message: "Proyecto creado" });
});

// PUT /api/v1/projects/:id - Actualiza un proyecto
app.put('/api/v1/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex !== -1) {
    // Actualiza solo los campos enviados
    projects[projectIndex] = { ...projects[projectIndex], ...req.body };
        res.json({ message: "Proyecto actualizado" }); // [cite: 34]
    } else {
        res.status(404).json({ message: "Proyecto no encontrado" });
    }
});

// DELETE /api/v1/projects/:id - Elimina un proyecto
app.delete('/api/v1/projects/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = projects.length;
    projects = projects.filter(p => p.id !== id);

    if (projects.length < initialLength) {
    res.json({ message: "Proyecto eliminado" });
    } else {
        res.status(404).json({ message: "Proyecto no encontrado" });
    }
});


// API de tareas (base: /api/v1/tasks)


// GET /api/v1/tasks - Lista todas las tareas
app.get('/api/v1/tasks', (req, res) => {
    res.json(tasks);
});

// GET /api/v1/tasks/:id - Obtiene una tarea
app.get('/api/v1/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

app.post('/api/v1/tasks', (req, res) => {
    // Puede incluir assignedTo
    const { title, description, projectId, assignedTo, status } = req.body; 
    const newTask = {
        id: taskIdCounter++,
        title,
        description,
        status: status || "todo", // por defecto
        projectId,
        assignedTo
    };
    tasks.push(newTask);
    res.status(201).json({ message: "Tarea creada" });
});

// PUT /api/v1/tasks/:id - Actualiza una tarea
app.put('/api/v1/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.json({ message: "Tarea actualizada" });
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});

// DELETE /api/v1/tasks/:id - Elimina una tarea
app.delete('/api/v1/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);

    if (tasks.length < initialLength) {
        res.json({ message: "Tarea eliminada" });
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});


// API de Personas (Base URL: /api/v1/people)

// GET /api/v1/people - Lista todas las personas
app.get('/api/v1/people', (req, res) => {
    res.json(people);
});

// GET /api/v1/people/:id - Obtiene una persona
app.get('/api/v1/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const person = people.find(p => p.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ message: "Persona no encontrada" });
    }
});

// POST /api/v1/people - Crea una persona
app.post('/api/v1/people', (req, res) => {
    const { name, email, role } = req.body;
    const newPerson = {
        id: peopleIdCounter++,
        name,
        email,
        role
    };
    people.push(newPerson);
    res.status(201).json({ message: "Persona creada" });
});

// PUT /api/v1/people/:id - Actualiza una persona
app.put('/api/v1/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const personIndex = people.findIndex(p => p.id === id);

    if (personIndex !== -1) {
        people[personIndex] = { ...people[personIndex], ...req.body };
        res.json({ message: "Persona actualizada" });
    } else {
        res.status(404).json({ message: "Persona no encontrada" });
    }
});

// DELETE /api/v1/people/:id - Elimina una persona
app.delete('/api/v1/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = people.length;
    people = people.filter(p => p.id !== id);

    if (people.length < initialLength) {
        res.json({ message: "Persona eliminada" });
    } else {
        res.status(404).json({ message: "Persona no encontrada" });
    }
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Endpoints disponibles:');
    console.log('  /api/v1/projects');
    console.log('  /api/v1/tasks');
    console.log('  /api/v1/people');
});

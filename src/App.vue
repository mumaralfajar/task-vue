<template>
  <div id="app">
    <button class="btn-add-task" @click="toggleTaskForm">Add Task</button>

    <TaskList @edit-task="setEditTask" @task-saved="refreshTasks" />

    <!-- Modal -->
    <div v-if="showTaskForm" class="modal">
      <div class="modal-content">
        <!-- Close button in the modal -->
        <span class="close" @click="toggleTaskForm">&times;</span>
        <h2 v-if="!taskToEdit">Create Task</h2>
        <h2 v-if="taskToEdit">Edit Task</h2>
        <TaskForm :taskToEdit="taskToEdit" @task-saved="refreshTasks" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from './components/tasks/TaskList.vue';
import TaskForm from './components/tasks/TaskForm.vue';

export default {
  data() {
    return {
      taskToEdit: null,
      showTaskForm: false,
    };
  },
  components: {
    TaskList,
    TaskForm,
  },
  methods: {
    setEditTask(task) {
      this.taskToEdit = task;
      this.showTaskForm = true;
    },
    refreshTasks() {
      this.taskToEdit = null;
      this.showTaskForm = false;
    },
    toggleTaskForm() {
      this.taskToEdit = null;
      this.showTaskForm = !this.showTaskForm;
    },
  },
};
</script>

<style>
/* Modal Styling */
.modal {
  display: block; /* Show the modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}

.modal-content {
  background-color: #000000;
  margin: 10% auto;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: relative;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 24px;
  cursor: pointer;
}

h2 {
  margin-top: 0;
}

/* Add Task Button Styling */
.btn-add-task {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-add-task:hover {
  opacity: 0.9;
}
</style>

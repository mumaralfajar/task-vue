<template>
  <div>
    <div v-for="task in tasks" :key="task.id" class="task-item">
      <div>
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </div>
      <div class="button-group">
        <button class="btn-edit" @click="editTask(task)">Edit</button>
        <button class="btn-delete" @click="deleteTask(task.id)">Delete</button>
      </div>
    </div>

    <!-- Pagination -->
    <ul class="pagination">
      <li @click="changePage(1)">First</li>
      <li @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</li>
      <li v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="changePage(page)">
        {{ page }}
      </li>
      <li @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</li>
      <li @click="changePage(totalPages)">Last</li>
    </ul>
  </div>
</template>

<script>
import TaskService from '@/services/TaskService';

export default {
  data() {
    return {
      tasks: [],
      currentPage: 1,
      pageSize: 5,
      totalPages: 1,
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await TaskService.getTasks(this.currentPage, this.pageSize);
        this.tasks = response.data.data.items;
        this.totalPages = Math.ceil(response.data.data.totalItems / this.pageSize);
      } catch (error) {
        console.error(error);
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchTasks();
      }
    },
    async deleteTask(id) {
      try {
        await TaskService.deleteTask(id);
        await this.fetchTasks();
      } catch (error) {
        console.error(error);
      }
    },
    editTask(task) {
      this.$emit('edit-task', task);
    },
    addNewTask() {
      this.$emit('add-task');
    },
  },
};
</script>

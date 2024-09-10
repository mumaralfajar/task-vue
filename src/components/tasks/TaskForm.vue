<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label>Title</label>
        <input v-model="task.title" required />
      </div>
      <div>
        <label>Description</label>
        <input v-model="task.description" required />
      </div>
      <button class="btn-add-task" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import TaskService from '@/services/TaskService';

export default {
  props: {
    taskToEdit: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
      },
      isEdit: false,
    };
  },
  watch: {
    taskToEdit: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.isEdit = true;
          this.task = {...newTask};
        } else {
          this.resetForm();
        }
      },
    },
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEdit) {
          await TaskService.updateTask(this.task.id, this.task);
        } else {
          await TaskService.createTask(this.task);
        }
        this.$emit('task-saved');
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    resetForm() {
      this.isEdit = false;
      this.task = {
        title: '',
        description: '',
      };
    },
  },
};
</script>

<template>
  <h2>TODO追加</h2>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="title">タイトル</label>
      <input type="text" id="title" v-model="data.title" />
    </div>
    <div>
      <label for="description">説明</label>
      <textarea id="description" v-model="data.description" />
    </div>
    <div>
      <label for="isDone">完了</label>
      <input type="checkbox" id="isDone" v-model="data.isDone" />
    </div>
    <button @click="onSubmit">作成する</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { Params } from "@/store/todo/types";
import { todoKey } from "@/store/todo";

export default defineComponent({
  setup() {
    const todoStore = inject(todoKey);
    if (!todoStore) {
      throw new Error("todoStore is not provided");
    }

    const router = useRouter();

    const data = reactive<Params>({
      title: "",
      description: "",
      isDone: false,
    });

    const onSubmit = async () => {
      const { title, description, isDone } = data;
      await todoStore.addTodo({
        title,
        description,
        isDone,
      });
      router.push("/todo");
    };

    return {
      data,
      onSubmit,
    };
  },
});
</script>

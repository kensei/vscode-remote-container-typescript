<template>
  <h2>TODO編集</h2>
  <div v-if="error">
    ID：{{ $route.params.id }}のTODOが見つかりませんでした。
  </div>
  <form v-else @submit.prevent="onSubmit">
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
    <button @click="onSubmit">更新する</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Params } from "@/store/todo/types";
import { todoKey } from "@/store/todo";

export default defineComponent({
  setup() {
    const todoStore = inject(todoKey);
    if (!todoStore) {
      throw new Error("todoStore is not provided");
    }

    const router = useRouter();
    const route = useRoute(); // setup()メソッド内で$routeオブジェクトにアクセスするため

    // 更新対象のTODOのidを取得
    const id = Number(route.params.id);
    try {
      // idからストアのTODOを取得
      const todo = todoStore.getTodo(id);

      // フォームの初期値にはストアから取得したTODOの値を代入
      const data = reactive<Params>({
        title: todo.title,
        description: todo.description,
        isDone: todo.isDone,
      });

      // フォームのsubmit時に、todoStoreのupdateTodoを呼び出して更新
      const onSubmit = () => {
        const { title, description, isDone } = data;
        todoStore.updateTodo(id, {
          ...todo,
          title,
          description,
          isDone,
        });
        router.push("/todo");
      };

      return {
        error: false,
        data,
        onSubmit,
      };
    } catch (e) {
      console.error(e);
      return {
        error: true,
      };
    }
  },
});
</script>

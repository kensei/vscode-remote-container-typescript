import { Ref, isRef, ref, computed, ComputedRef } from "vue";

export const useDoneCaption = (
  isDone: boolean | Ref<boolean>
): ComputedRef<string> => {
  const boolRef = isRef(isDone) ? isDone : ref(isDone);
  return computed(() => {
    return boolRef.value ? "done" : "";
  });
};

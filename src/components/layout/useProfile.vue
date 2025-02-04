<template>
  <div class="user-profile">
    <div class="user-profile__avatar-container">
      <img class="user-profile__avatar" alt="User Avatar" src="@/assets/icons/avatar.svg">
    </div>
    <span class="user-profile__name">Katherine Ellis</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserProfile',
});
</script>

<style lang="scss" scoped>
.user-profile {
  display: flex;
  align-items: center;
  background: rgba(7, 40, 99, 1);
  gap: 1.5rem;
  height: 100%;
  padding: 0 2rem;

  @media (max-width: 600px) {
    padding: 0 1rem;
  }

  &__avatar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0a7fae;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }

  &__avatar {
    width: 30px;
    height: 30px;
  }

  &__name {
    font-size: 1.5rem;
    font-weight: 600;

    @media (max-width: 600px) {
      display: none;
    }
  }
}
</style>

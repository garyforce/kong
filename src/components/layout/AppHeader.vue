<template>
  <header class="header">
    <div class="navbar">
      <router-link to="/">
        <img class="navbar__logo" alt="Kong logo" data-testid="kong-logo" src="@/assets/icons/kong-logo.svg">
      </router-link>
      <div class="navbar-list">
        <template v-for="option in menuItems" :key="option.title">
          <span class="navbar-list-item">
            <img class="navbar-list-item__icon" :alt="option.title" :src="option.icon">
            {{ option.title }}
          </span>
        </template>
      </div>
    </div>

    <div class="user-profile">
      <div class="avatar-container">
        <img class="user-profile__avatar" alt="User Avatar" src="@/assets/icons/avatar.svg">
      </div>
      <span class="username">Katherine Ellis</span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMenu } from '@/composables/useMenu';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const { menuItems } = useMenu();
    return { menuItems };
  },
});
</script>

<style lang="scss" scoped>
/* Header Layout */
.header {
  display: flex;
  align-items: center;
  color: #fffc;
  height: 6rem;
  position: sticky;
  top: 0;
  z-index: 1;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  background: linear-gradient(180deg, #09224f 0%, #073382 100%);
  font-size: 1.5rem;
  font-weight: 600;
  height: 100%;
  padding: 0;
  padding-right: 1.5rem;

  @media only screen and (max-width: 600px) {
    padding-right: 0;
  }
}

.navbar__logo {
  height: 27px;
  width: auto;
  object-fit: contain;
}

.navbar-list {
  display: flex;
  gap: 1.5rem;
  height: 100%;

  @media only screen and (max-width: 600px) {
    gap: 1rem;
  }
}

.navbar-list-item {
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  gap: 1rem;
  padding-inline: 1rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #ffffff1a;
    opacity: 1;
  }

  @media only screen and (max-width: 600px) {
    padding-inline: 0.5rem;

    .navbar-list-item__icon {
      display: none;
    }
  }
}

.navbar-list-item__icon {
  width: 20px;
  height: 20px;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  background: rgba(7, 40, 99, 1);
  gap: 1.5rem;
  height: 100%;
  padding: 0 2rem;

  @media only screen and (max-width: 600px) {
    padding: 0 1rem;
  }
}

.avatar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a7fae;
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
}

.user-profile__avatar {
  width: 30px;
  height: 30px;
}

.username {
  font-size: 1.5rem;

  @media only screen and (max-width: 600px) {
    display: none;
  }
}
</style>

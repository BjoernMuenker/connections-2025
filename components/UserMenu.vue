<script setup lang="ts">
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const runtimeConfig = useRuntimeConfig();

  const { routes } = useRoutes();

  async function signOut() {
    await supabase.auth.signOut();
    navigateTo(routes.signIn);
  }
</script>

<template>
  <div class="user-menu">
    <div class="user">
      <div class="heading-large">{{ user?.user_metadata?.display_name }}</div>
      <div>{{ user?.email }}</div>
    </div>
    <nav>
      <div class="nav-section">
        <button @click="signOut">Abmelden</button>
      </div>
      <div class="nav-section">
        <NuxtLink :to="routes.tutorial">Tipps & Tricks</NuxtLink>
      </div>
      <div class="nav-section">
        <NuxtLink :to="routes.changeUsername">Nutzername ändern</NuxtLink>
        <NuxtLink :to="routes.changePasswordAuthorized">Passwort ändern</NuxtLink>
        <NuxtLink :to="routes.changeEmail">E-Mail ändern</NuxtLink>
        <NuxtLink :to="routes.deleteAccount">Account löschen</NuxtLink>
      </div>
    </nav>
    <div class="build-info copy-small">
      <div>v{{ runtimeConfig.public.NUXT_PUBLIC_BUILD_GIT_TAG }} / {{ runtimeConfig.public.NUXT_PUBLIC_BUILD_TIMESTAMP }}</div>
      <div>Build {{ runtimeConfig.public.NUXT_PUBLIC_BUILD_ID }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: spacing('l');
  }

  .nav-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: spacing('s');
  }

  @include hover-only {
    button:hover,
    a:hover {
      color: color('blue-300');
    }
  }

  .heading-large {
    margin-bottom: spacing('xxs');
  }

  .user {
    margin-bottom: spacing('xl');
    padding-right: 56px;

    * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .build-info {
    margin-top: spacing('xl');
    color: color('grey-200');

    * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>

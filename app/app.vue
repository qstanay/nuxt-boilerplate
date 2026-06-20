<script setup lang="ts">
import { ref } from 'vue';

import CalendarBoard from './features/calendar/ui/CalendarBoard.vue';
import AppSidebar from './features/sidebar/ui/AppSidebar.vue';

const isSidebarOpen = ref(false);
</script>

<template>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
        <div class="app-shell">
            <AppSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
            <CalendarBoard @open-sidebar="isSidebarOpen = true" />
        </div>
    </NuxtLayout>
</template>

<style>
:root {
    color-scheme: light;
    --surface: #ffffff;
    --surface-muted: #faf9f7;
    --surface-soft: #f6f3f1;
    --line: #ece8e5;
    --line-strong: #ded8d2;
    --text: #2b2926;
    --text-muted: #706a64;
    --text-faint: #a49b93;
    --accent: #dd3f2d;
    --accent-soft: #fff1ea;
    --sidebar-width: 282px;
    --header-height: 134px;
    --hour-height: 72px;
    --font-main:
        Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* {
    box-sizing: border-box;
}

html,
body,
#__nuxt {
    min-height: 100%;
    margin: 0;
}

body {
    overflow: hidden;
    background: var(--surface);
    color: var(--text);
    font-family: var(--font-main);
}

button {
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: inherit;
    font: inherit;
}

button:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--accent), white 20%);
    outline-offset: 2px;
}

.app-shell {
    display: grid;
    grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
    min-height: 100vh;
    background: var(--surface);
}

@media (max-width: 980px) {
    body {
        overflow: auto;
    }

    .app-shell {
        grid-template-columns: 1fr;
    }
}
</style>

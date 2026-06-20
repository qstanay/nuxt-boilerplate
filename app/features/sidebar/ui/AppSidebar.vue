<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useProjectsStore } from '../../projects/model/store';

type NavItem = {
    label: string;
    count?: number;
    active?: boolean;
    icon: string;
};

const props = defineProps<{
    isOpen: boolean;
}>();

const emit = defineEmits<{
    close: [];
}>();

const navItems: NavItem[] = [
    { label: 'Поиск', icon: 'search' },
    { label: 'Входящие', icon: 'inbox', count: 2 },
    { label: 'Сегодня', icon: 'today', count: 3 },
    { label: 'Предстоящее', icon: 'calendar', active: true },
    { label: 'Фильтры и метки', icon: 'filter' },
    { label: 'Отчеты', icon: 'chart' },
];

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);
</script>

<template>
    <button
        v-if="props.isOpen"
        class="sidebar-scrim"
        aria-label="Закрыть навигацию"
        @click="emit('close')"
    />

    <aside class="sidebar" :class="{ open: props.isOpen }" aria-label="Основная навигация">
        <div class="sidebar-top">
            <button class="icon-button ghost" aria-label="Уведомления">
                <span class="bell-icon" />
            </button>
            <button
                class="icon-button selected"
                aria-label="Свернуть боковую панель"
                @click="emit('close')"
            >
                <span class="panel-icon" />
            </button>
        </div>

        <button class="workspace-switcher">
            <span class="avatar">Q</span>
            <span>Qstanay</span>
            <span class="chevron" />
        </button>

        <button class="add-task">
            <span class="add-icon">+</span>
            <span>Добавить задачу</span>
            <span class="quick-add-mark" />
        </button>

        <nav class="nav-list">
            <button
                v-for="item in navItems"
                :key="item.label"
                class="nav-item"
                :class="{ active: item.active }"
                @click="emit('close')"
            >
                <span class="nav-icon" :class="`icon-${item.icon}`" />
                <span class="nav-label">{{ item.label }}</span>
                <span v-if="item.count" class="nav-count">{{ item.count }}</span>
            </button>
        </nav>

        <section class="projects-block" aria-labelledby="projects-title">
            <h2 id="projects-title">Мои проекты</h2>
            <button
                v-for="project in projects"
                :key="project.name"
                class="project-item"
                @click="emit('close')"
            >
                <span class="project-hash" :style="{ color: project.color }">#</span>
                <span>{{ project.name }}</span>
                <span v-if="project.count" class="nav-count">{{ project.count }}</span>
            </button>
        </section>

        <button class="support-link">
            <span class="support-icon">?</span>
            <span>Поддержка и ресурсы</span>
        </button>
    </aside>
</template>

<style scoped>
.sidebar-scrim {
    display: none;
}

.sidebar {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: max(10px, env(safe-area-inset-top)) 12px max(14px, env(safe-area-inset-bottom));
    background: var(--surface-muted);
    border-right: 1px solid #f2efec;
}

.sidebar-top {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    min-height: 36px;
}

.icon-button {
    display: inline-grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border: 1px solid transparent;
    cursor: pointer;
}

.icon-button:hover,
.nav-item:hover,
.project-item:hover,
.workspace-switcher:hover,
.support-link:hover {
    background: var(--surface-soft);
}

.icon-button.selected {
    background: #f0ece8;
}

.workspace-switcher {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 42px;
    padding: 6px 6px;
    cursor: pointer;
    font-weight: 650;
}

.avatar {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #efe2a7;
    color: #476652;
    font-size: 13px;
    font-weight: 750;
}

.chevron {
    width: 8px;
    height: 8px;
    margin-left: -2px;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    transform: rotate(45deg) translateY(-2px);
}

.add-task {
    display: grid;
    grid-template-columns: 26px 1fr 24px;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 42px;
    margin: 22px 0 6px;
    padding: 6px 4px;
    color: var(--accent);
    cursor: pointer;
    font-weight: 700;
    text-align: left;
}

.add-icon {
    display: grid;
    place-items: center;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background: var(--accent);
    color: #fff;
    font-size: 20px;
    line-height: 1;
}

.quick-add-mark {
    justify-self: end;
    position: relative;
    width: 17px;
    height: 21px;
}

.quick-add-mark::before,
.quick-add-mark::after {
    position: absolute;
    top: 5px;
    width: 3px;
    height: 16px;
    border-radius: 999px;
    background: var(--accent);
    content: '';
}

.quick-add-mark::before {
    left: 3px;
    box-shadow: 6px -6px 0 var(--accent);
}

.quick-add-mark::after {
    right: 0;
}

.nav-list {
    display: grid;
    gap: 2px;
}

.nav-item,
.project-item {
    display: grid;
    grid-template-columns: 26px minmax(0, 1fr) auto;
    align-items: center;
    min-height: 34px;
    width: 100%;
    padding: 0 8px 0 5px;
    cursor: pointer;
    text-align: left;
}

.nav-item.active {
    background: var(--accent-soft);
    color: var(--accent);
}

.nav-label,
.project-item span:nth-child(2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.nav-count {
    color: var(--text-faint);
    font-size: 12px;
}

.nav-icon {
    position: relative;
    width: 16px;
    height: 16px;
    color: var(--text-muted);
}

.active .nav-icon {
    color: var(--accent);
}

.icon-search {
    border: 1.5px solid currentColor;
    border-radius: 50%;
}

.icon-search::after {
    position: absolute;
    right: -3px;
    bottom: -1px;
    width: 6px;
    height: 1.5px;
    background: currentColor;
    transform: rotate(45deg);
    content: '';
}

.icon-inbox,
.icon-today,
.icon-calendar,
.icon-filter,
.icon-chart {
    border: 1.5px solid currentColor;
    border-radius: 3px;
}

.icon-inbox::after {
    position: absolute;
    left: 3px;
    right: 3px;
    bottom: 4px;
    height: 1.5px;
    background: currentColor;
    content: '';
}

.icon-today::before,
.icon-calendar::before {
    position: absolute;
    left: 2px;
    right: 2px;
    top: 4px;
    height: 1px;
    background: currentColor;
    content: '';
}

.icon-today::after {
    position: absolute;
    inset: 7px 4px 3px;
    border: 1px solid currentColor;
    content: '';
}

.icon-filter {
    border: 0;
    background:
        linear-gradient(currentColor, currentColor) 1px 1px / 5px 5px no-repeat,
        linear-gradient(currentColor, currentColor) 10px 1px / 5px 5px no-repeat,
        linear-gradient(currentColor, currentColor) 1px 10px / 5px 5px no-repeat,
        linear-gradient(currentColor, currentColor) 10px 10px / 5px 5px no-repeat;
}

.icon-chart::before {
    position: absolute;
    left: 2px;
    right: 2px;
    top: 8px;
    height: 6px;
    border-top: 1.5px solid currentColor;
    transform: skewX(-18deg);
    content: '';
}

.projects-block {
    margin-top: 34px;
}

.projects-block h2 {
    margin: 0 0 8px;
    color: var(--text-muted);
    font-size: 14px;
    font-weight: 750;
}

.project-hash {
    font-size: 20px;
    line-height: 1;
}

.support-link {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 100%;
    min-height: 34px;
    margin-top: auto;
    padding: 0 4px;
    color: var(--text-muted);
    cursor: pointer;
    font-weight: 700;
    text-align: left;
}

.support-icon {
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    border: 1px solid var(--text-muted);
    border-radius: 50%;
    font-size: 13px;
}

.panel-icon,
.bell-icon {
    position: relative;
    display: inline-block;
    color: currentColor;
}

.panel-icon {
    width: 18px;
    height: 18px;
    border: 1.5px solid currentColor;
    border-radius: 2px;
}

.panel-icon::after {
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 6px;
    width: 1.5px;
    background: currentColor;
    content: '';
}

.bell-icon {
    width: 14px;
    height: 16px;
    border: 1.5px solid currentColor;
    border-bottom: 0;
    border-radius: 8px 8px 4px 4px;
}

.bell-icon::after {
    position: absolute;
    left: 4px;
    bottom: -4px;
    width: 5px;
    height: 5px;
    border-bottom: 1.5px solid currentColor;
    border-radius: 50%;
    content: '';
}

@media (max-width: 980px) {
    .sidebar {
        position: fixed;
        inset: 0 auto 0 0;
        z-index: 20;
        width: min(var(--sidebar-width), 86vw);
        transform: translateX(-100%);
        transition: transform 180ms ease;
        box-shadow: 12px 0 32px rgb(0 0 0 / 10%);
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .sidebar-scrim {
        position: fixed;
        inset: 0;
        z-index: 19;
        display: block;
        background: rgb(43 41 38 / 20%);
        cursor: pointer;
    }
}
</style>

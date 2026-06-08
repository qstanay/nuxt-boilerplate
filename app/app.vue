<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { useProjectsStore } from './stores/projects';

type NavItem = {
    label: string;
    count?: number;
    active?: boolean;
    accent?: string;
    icon: string;
};

type Day = {
    weekday: string;
    day: number;
    active?: boolean;
};

type Task = {
    title: string;
    meta: string;
    dayIndex: number;
    hour: number;
    duration: number;
    color: string;
};

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

const days: Day[] = [
    { weekday: 'Пн', day: 8, active: true },
    { weekday: 'Вт', day: 9 },
    { weekday: 'Ср', day: 10 },
    { weekday: 'Чт', day: 11 },
    { weekday: 'Пт', day: 12 },
    { weekday: 'Сб', day: 13 },
    { weekday: 'Вс', day: 14 },
];

const hours = Array.from({ length: 9 }, (_, index) => 14 + index);

const tasks: Task[] = [
    {
        title: 'Встреча рабочей группы DS...',
        meta: '14:30-15:30',
        dayIndex: 0,
        hour: 14.5,
        duration: 1,
        color: '#ffa62b',
    },
    {
        title: 'Проверить доску задач',
        meta: '17:00-17:30',
        dayIndex: 2,
        hour: 17,
        duration: 0.5,
        color: '#dd4b39',
    },
];

const isSidebarOpen = ref(false);

const getTaskStyle = (task: Task) => ({
    gridColumn: `${task.dayIndex + 1}`,
    top: `${(task.hour - 14) * 72 + 36}px`,
    height: `${Math.max(task.duration * 72, 42)}px`,
    '--task-color': task.color,
});
</script>

<template>
    <NuxtRouteAnnouncer />

    <div class="app-shell">
        <button
            v-if="isSidebarOpen"
            class="sidebar-scrim"
            aria-label="Закрыть навигацию"
            @click="isSidebarOpen = false"
        />

        <aside class="sidebar" :class="{ open: isSidebarOpen }" aria-label="Основная навигация">
            <div class="sidebar-top">
                <button class="icon-button ghost" aria-label="Уведомления">
                    <span class="bell-icon" />
                </button>
                <button
                    class="icon-button selected"
                    aria-label="Свернуть боковую панель"
                    @click="isSidebarOpen = false"
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
                    @click="isSidebarOpen = false"
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
                    @click="isSidebarOpen = false"
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

        <main class="task-board">
            <header class="board-header">
                <div class="board-nav">
                    <button
                        class="icon-button ghost menu-button"
                        aria-label="Открыть навигацию"
                        @click="isSidebarOpen = true"
                    >
                        <span class="menu-icon" />
                    </button>
                    <button class="icon-button ghost" aria-label="Назад">
                        <span class="arrow-left" />
                    </button>
                    <button class="icon-button ghost" aria-label="Вперед">
                        <span class="arrow-right" />
                    </button>
                </div>

                <div class="title-row">
                    <div>
                        <h1>Предстоящее</h1>
                        <p>июнь 2026</p>
                    </div>

                    <div class="view-actions" aria-label="Настройки отображения">
                        <button class="view-button">
                            <span class="view-grid-icon" />
                            <span>Отображение: 1</span>
                        </button>
                        <button class="icon-button ghost" aria-label="Еще">
                            <span class="more-icon" />
                        </button>
                    </div>
                </div>

                <div class="calendar-actions">
                    <div class="date-stepper">
                        <button class="icon-button small" aria-label="Предыдущая неделя">
                            <span class="arrow-left" />
                        </button>
                        <button class="today-button">Сегодня</button>
                        <button class="icon-button small" aria-label="Следующая неделя">
                            <span class="arrow-right" />
                        </button>
                    </div>

                    <button class="planned-button">
                        <span>Запланировано: 7</span>
                        <span class="panel-mini-icon" />
                    </button>
                </div>
            </header>

            <section class="calendar-board" aria-label="Недельная доска задач">
                <div class="calendar-days">
                    <div class="time-spacer" />
                    <button
                        v-for="day in days"
                        :key="`${day.weekday}-${day.day}`"
                        class="day-heading"
                        :class="{ active: day.active }"
                    >
                        <span>{{ day.weekday }}</span>
                        <span class="day-number">{{ day.day }}</span>
                    </button>
                </div>

                <div class="all-day-row">
                    <span>Весь день</span>
                    <div v-for="day in days" :key="`all-day-${day.day}`" />
                </div>

                <div class="schedule">
                    <div class="time-column">
                        <span v-for="hour in hours" :key="hour">{{ hour }}:00</span>
                    </div>

                    <div class="week-grid">
                        <div v-for="day in days" :key="`column-${day.day}`" class="day-column" />
                        <div
                            v-for="hour in hours"
                            :key="`line-${hour}`"
                            class="hour-line"
                            :style="{ top: `${(hour - 14) * 72}px` }"
                        />

                        <div class="current-time" aria-hidden="true">
                            <span>19:52</span>
                        </div>

                        <article
                            v-for="task in tasks"
                            :key="task.title"
                            class="task-card"
                            :style="getTaskStyle(task)"
                        >
                            <span class="task-priority" />
                            <strong>{{ task.title }}</strong>
                            <span>{{ task.meta }}</span>
                        </article>
                    </div>
                </div>
            </section>
        </main>

        <button class="mobile-add" aria-label="Добавить задачу">+</button>
    </div>
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

.icon-button.small {
    width: 28px;
    height: 28px;
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

.chevron,
.arrow-left,
.arrow-right {
    width: 8px;
    height: 8px;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
}

.chevron {
    margin-left: -2px;
    transform: rotate(45deg) translateY(-2px);
}

.arrow-left {
    transform: rotate(135deg);
}

.arrow-right {
    transform: rotate(-45deg);
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

.task-board {
    min-width: 0;
    max-height: 100vh;
    overflow: hidden;
    background: var(--surface);
}

.board-header {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
        'nav actions'
        'title actions';
    gap: 14px 18px;
    min-height: var(--header-height);
    padding: max(16px, env(safe-area-inset-top)) 24px 8px;
}

.board-nav {
    grid-area: nav;
    display: flex;
    gap: 8px;
}

.title-row {
    grid-area: title;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
}

.title-row h1 {
    margin: 0;
    font-size: clamp(26px, 3vw, 32px);
    line-height: 1.05;
    font-weight: 800;
}

.title-row p {
    margin: 10px 0 0;
    font-size: 15px;
    font-weight: 750;
}

.view-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: start;
    color: var(--text-muted);
}

.view-button,
.planned-button,
.today-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 32px;
    padding: 0 12px;
    border: 1px solid var(--line-strong);
    background: #fff;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 700;
}

.calendar-actions {
    grid-area: actions;
    display: flex;
    align-items: end;
    gap: 8px;
    padding-bottom: 2px;
}

.date-stepper {
    display: flex;
    align-items: center;
    border: 1px solid var(--line-strong);
    border-radius: 6px;
    background: #fff;
}

.date-stepper .icon-button,
.date-stepper .today-button {
    border: 0;
}

.today-button {
    min-width: 82px;
    padding: 0 8px;
}

.view-grid-icon,
.panel-mini-icon,
.panel-icon,
.bell-icon,
.more-icon {
    position: relative;
    display: inline-block;
    color: currentColor;
}

.view-grid-icon,
.panel-mini-icon {
    width: 16px;
    height: 16px;
    border: 1.5px solid currentColor;
    border-radius: 2px;
    background:
        linear-gradient(currentColor, currentColor) 4px 0 / 1px 100% no-repeat,
        linear-gradient(currentColor, currentColor) 9px 0 / 1px 100% no-repeat,
        linear-gradient(currentColor, currentColor) 0 5px / 100% 1px no-repeat,
        linear-gradient(currentColor, currentColor) 0 10px / 100% 1px no-repeat;
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

.more-icon {
    width: 18px;
    height: 4px;
    background: radial-gradient(circle, currentColor 1.6px, transparent 1.7px) left center / 6px 4px
        repeat-x;
}

.menu-button {
    display: none;
}

.menu-icon {
    position: relative;
    display: inline-block;
    width: 18px;
    height: 12px;
    border-top: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
}

.menu-icon::after {
    position: absolute;
    top: 4px;
    left: 0;
    width: 18px;
    height: 1.5px;
    background: currentColor;
    content: '';
}

.calendar-board {
    height: calc(100vh - var(--header-height));
    overflow: auto;
    border-top: 1px solid var(--line);
    background: #fff;
}

.calendar-days {
    position: sticky;
    top: 0;
    z-index: 5;
    display: grid;
    grid-template-columns: 58px repeat(7, minmax(132px, 1fr));
    min-width: 982px;
    background: #fff;
    border-bottom: 1px solid var(--line);
}

.time-spacer {
    border-right: 1px solid var(--line);
}

.day-heading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-height: 34px;
    border-right: 1px solid #f1eeeb;
    color: var(--text-muted);
    cursor: pointer;
}

.day-heading.active {
    color: var(--text);
    font-weight: 750;
}

.day-number {
    display: inline-grid;
    place-items: center;
    min-width: 22px;
    height: 22px;
    border-radius: 999px;
}

.day-heading.active .day-number {
    background: var(--accent);
    color: #fff;
}

.all-day-row {
    position: sticky;
    top: 34px;
    z-index: 4;
    display: grid;
    grid-template-columns: 58px repeat(7, minmax(132px, 1fr));
    min-width: 982px;
    height: 28px;
    background: #fff;
    border-bottom: 1px solid var(--line);
}

.all-day-row span {
    display: flex;
    align-items: center;
    padding-left: 2px;
    color: var(--text-muted);
    font-size: 12px;
    white-space: nowrap;
}

.all-day-row div,
.all-day-row span {
    border-right: 1px solid #f1eeeb;
}

.schedule {
    display: grid;
    grid-template-columns: 58px minmax(924px, 1fr);
    min-width: 982px;
}

.time-column {
    display: grid;
    grid-template-rows: repeat(9, var(--hour-height));
    padding-top: 0;
    border-right: 1px solid var(--line);
    color: var(--text-muted);
    font-size: 13px;
}

.time-column span {
    transform: translateY(-8px);
    padding-left: 16px;
}

.week-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, minmax(132px, 1fr));
    height: calc(var(--hour-height) * 9);
}

.day-column {
    border-right: 1px solid #f1eeeb;
}

.hour-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: #f1eeeb;
}

.current-time {
    position: absolute;
    top: 395px;
    left: 0;
    right: 0;
    height: 1px;
    background: #ff3b30;
}

.current-time::before {
    position: absolute;
    left: -1px;
    top: -4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff3b30;
    content: '';
}

.current-time span {
    position: absolute;
    left: -42px;
    top: -10px;
    color: #ff3b30;
    font-size: 12px;
    font-weight: 750;
}

.task-card {
    position: absolute;
    left: 10px;
    right: 8px;
    z-index: 2;
    display: grid;
    align-content: start;
    gap: 2px;
    max-width: 184px;
    padding: 8px 10px 8px 20px;
    border-radius: 5px;
    background: color-mix(in srgb, var(--task-color), white 78%);
    color: #3b3027;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--task-color), white 55%);
}

.task-priority {
    position: absolute;
    left: 6px;
    top: 9px;
    width: 12px;
    height: 12px;
    border: 1.5px solid var(--task-color);
    border-radius: 50%;
    background: #fff5e7;
}

.task-card strong {
    display: -webkit-box;
    overflow: hidden;
    font-size: 13px;
    line-height: 1.15;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.task-card span:last-child {
    color: #6b5f55;
    font-size: 12px;
}

.mobile-add {
    display: none;
}

@media (max-width: 980px) {
    body {
        overflow: auto;
    }

    .app-shell {
        grid-template-columns: 1fr;
    }

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

    .menu-button {
        display: inline-grid;
    }

    .task-board {
        max-height: none;
        min-height: 100vh;
    }

    .board-header {
        grid-template-columns: 1fr;
        grid-template-areas:
            'nav'
            'title'
            'actions';
        min-height: auto;
        padding: max(16px, env(safe-area-inset-top)) 16px 10px;
    }

    .title-row {
        align-items: start;
    }

    .view-actions {
        display: none;
    }

    .calendar-actions {
        justify-content: space-between;
    }

    .calendar-board {
        height: calc(100vh - 152px);
    }

    .mobile-add {
        position: fixed;
        right: max(18px, env(safe-area-inset-right));
        bottom: max(18px, env(safe-area-inset-bottom));
        z-index: 30;
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: var(--accent);
        color: #fff;
        box-shadow: 0 12px 28px rgb(221 63 45 / 28%);
        cursor: pointer;
        font-size: 30px;
        line-height: 1;
    }
}

@media (max-width: 620px) {
    .title-row h1 {
        font-size: 26px;
    }

    .calendar-actions {
        align-items: stretch;
        flex-direction: column;
    }

    .date-stepper,
    .planned-button {
        width: 100%;
    }

    .today-button,
    .planned-button {
        flex: 1;
    }

    .calendar-days,
    .all-day-row,
    .schedule {
        min-width: 900px;
    }

    .calendar-days,
    .all-day-row {
        grid-template-columns: 54px repeat(7, minmax(121px, 1fr));
    }

    .schedule {
        grid-template-columns: 54px minmax(846px, 1fr);
    }

    .time-column span {
        padding-left: 12px;
    }
}
</style>

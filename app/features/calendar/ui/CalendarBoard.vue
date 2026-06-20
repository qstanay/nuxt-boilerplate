<script setup lang="ts">
import { days, getTaskStyle, hours, tasks } from '../model/mock';

const emit = defineEmits<{
    openSidebar: [];
}>();
</script>

<template>
    <main class="task-board">
        <header class="board-header">
            <div class="board-nav">
                <button
                    class="icon-button ghost menu-button"
                    aria-label="Открыть навигацию"
                    @click="emit('openSidebar')"
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

        <button class="mobile-add" aria-label="Добавить задачу">+</button>
    </main>
</template>

<style scoped>
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

.icon-button {
    display: inline-grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border: 1px solid transparent;
    cursor: pointer;
}

.icon-button:hover {
    background: var(--surface-soft);
}

.icon-button.small {
    width: 28px;
    height: 28px;
}

.arrow-left,
.arrow-right {
    width: 8px;
    height: 8px;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
}

.arrow-left {
    transform: rotate(135deg);
}

.arrow-right {
    transform: rotate(-45deg);
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

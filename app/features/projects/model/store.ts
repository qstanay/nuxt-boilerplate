import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Project } from './types';

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref<Project[]>([
        { id: 'hostdev', name: 'HOSTDEV', count: 6, color: '#70a83b' },
        { id: 'bereg', name: 'BEREG', color: '#2f70ff' },
        { id: 'beton', name: 'BETON', count: 1, color: '#8b6a4f' },
        { id: 'wmru', name: 'WMRU', color: '#1297c8' },
        { id: 'personal', name: 'Личное', color: '#c13dff' },
    ]);

    return {
        projects,
    };
});

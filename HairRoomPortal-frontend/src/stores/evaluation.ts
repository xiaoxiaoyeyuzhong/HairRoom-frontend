// stores/evaluation.ts (Pinia store)
import { defineStore } from 'pinia';
import StaffEvaluationVO = API.StaffEvaluationVO;

export const useEvaluationStore = defineStore('evaluation', {
    state: () => ({
        currentEvaluation: null as StaffEvaluationVO | null
    }),
    actions: {
        setEvaluation(data: StaffEvaluationVO) {
            this.currentEvaluation = data;
        },
        clearEvaluation() {
            this.currentEvaluation = null;
        }
    }
});
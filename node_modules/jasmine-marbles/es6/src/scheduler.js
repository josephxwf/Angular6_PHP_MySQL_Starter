import { TestScheduler } from 'rxjs/testing';
import { observableMatcher } from './matcher';
var scheduler;
export function initTestScheduler() {
    scheduler = new TestScheduler(observableMatcher);
}
export function getTestScheduler() {
    if (scheduler) {
        return scheduler;
    }
    throw new Error('No test scheduler initialized');
}
export function resetTestScheduler() {
    scheduler = null;
}
//# sourceMappingURL=scheduler.js.map
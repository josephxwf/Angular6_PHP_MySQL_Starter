"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("rxjs/testing");
var matcher_1 = require("./matcher");
var scheduler;
function initTestScheduler() {
    scheduler = new testing_1.TestScheduler(matcher_1.observableMatcher);
}
exports.initTestScheduler = initTestScheduler;
function getTestScheduler() {
    if (scheduler) {
        return scheduler;
    }
    throw new Error('No test scheduler initialized');
}
exports.getTestScheduler = getTestScheduler;
function resetTestScheduler() {
    scheduler = null;
}
exports.resetTestScheduler = resetTestScheduler;
//# sourceMappingURL=scheduler.js.map
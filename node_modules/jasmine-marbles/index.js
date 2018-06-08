"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var testing_1 = require("rxjs/testing");
var scheduler_1 = require("./src/scheduler");
var test_observables_1 = require("./src/test-observables");
var scheduler_2 = require("./src/scheduler");
exports.getTestScheduler = scheduler_2.getTestScheduler;
exports.initTestScheduler = scheduler_2.initTestScheduler;
exports.resetTestScheduler = scheduler_2.resetTestScheduler;
function hot(marbles, values, error) {
    return new test_observables_1.TestHotObservable(marbles, values, error);
}
exports.hot = hot;
function cold(marbles, values, error) {
    return new test_observables_1.TestColdObservable(marbles, values, error);
}
exports.cold = cold;
function time(marbles) {
    return scheduler_1.getTestScheduler().createTime(marbles);
}
exports.time = time;
/*
* Based on source code found in rxjs library
* https://github.com/ReactiveX/rxjs/blob/master/src/testing/TestScheduler.ts
*
*/
function materializeInnerObservable(observable, outerFrame) {
    var messages = [];
    var scheduler = scheduler_1.getTestScheduler();
    observable.subscribe(function (value) {
        messages.push({
            frame: scheduler.frame - outerFrame,
            notification: rxjs_1.Notification.createNext(value),
        });
    }, function (err) {
        messages.push({
            frame: scheduler.frame - outerFrame,
            notification: rxjs_1.Notification.createError(err),
        });
    }, function () {
        messages.push({
            frame: scheduler.frame - outerFrame,
            notification: rxjs_1.Notification.createComplete(),
        });
    });
    return messages;
}
function addMatchers() {
    jasmine.addMatchers({
        toHaveSubscriptions: function () { return ({
            compare: function (actual, marbles) {
                var marblesArray = typeof marbles === 'string' ? [marbles] : marbles;
                var results = marblesArray.map(function (marbles) {
                    return testing_1.TestScheduler.parseMarblesAsSubscriptions(marbles);
                });
                expect(results).toEqual(actual.getSubscriptions());
                return { pass: true };
            },
        }); },
        toBeObservable: function () { return ({
            compare: function (actual, fixture) {
                var results = [];
                var subscription;
                var scheduler = scheduler_1.getTestScheduler();
                scheduler.schedule(function () {
                    subscription = actual.subscribe(function (x) {
                        var value = x;
                        // Support Observable-of-Observables
                        if (x instanceof rxjs_1.Observable) {
                            value = materializeInnerObservable(value, scheduler.frame);
                        }
                        results.push({
                            frame: scheduler.frame,
                            notification: rxjs_1.Notification.createNext(value),
                        });
                    }, function (err) {
                        results.push({
                            frame: scheduler.frame,
                            notification: rxjs_1.Notification.createError(err),
                        });
                    }, function () {
                        results.push({
                            frame: scheduler.frame,
                            notification: rxjs_1.Notification.createComplete(),
                        });
                    });
                });
                scheduler.flush();
                var expected = testing_1.TestScheduler.parseMarbles(fixture.marbles, fixture.values, fixture.error, true);
                expect(results).toEqual(expected);
                return { pass: true };
            },
        }); },
    });
}
exports.addMatchers = addMatchers;
if (typeof module === 'object' && module.exports) {
    jasmine.getEnv().beforeAll(function () { return addMatchers(); });
    jasmine.getEnv().beforeEach(function () { return scheduler_1.initTestScheduler(); });
    jasmine.getEnv().afterEach(function () {
        scheduler_1.getTestScheduler().flush();
        scheduler_1.resetTestScheduler();
    });
}
//# sourceMappingURL=index.js.map
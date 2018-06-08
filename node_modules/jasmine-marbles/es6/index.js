import { Notification, Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler, initTestScheduler, resetTestScheduler, } from './src/scheduler';
import { TestColdObservable, TestHotObservable, } from './src/test-observables';
export { getTestScheduler, initTestScheduler, resetTestScheduler, } from './src/scheduler';
export function hot(marbles, values, error) {
    return new TestHotObservable(marbles, values, error);
}
export function cold(marbles, values, error) {
    return new TestColdObservable(marbles, values, error);
}
export function time(marbles) {
    return getTestScheduler().createTime(marbles);
}
/*
* Based on source code found in rxjs library
* https://github.com/ReactiveX/rxjs/blob/master/src/testing/TestScheduler.ts
*
*/
function materializeInnerObservable(observable, outerFrame) {
    var messages = [];
    var scheduler = getTestScheduler();
    observable.subscribe(function (value) {
        messages.push({
            frame: scheduler.frame - outerFrame,
            notification: Notification.createNext(value),
        });
    }, function (err) {
        messages.push({
            frame: scheduler.frame - outerFrame,
            notification: Notification.createError(err),
        });
    }, function () {
        messages.push({
            frame: scheduler.frame - outerFrame,
            notification: Notification.createComplete(),
        });
    });
    return messages;
}
export function addMatchers() {
    jasmine.addMatchers({
        toHaveSubscriptions: function () { return ({
            compare: function (actual, marbles) {
                var marblesArray = typeof marbles === 'string' ? [marbles] : marbles;
                var results = marblesArray.map(function (marbles) {
                    return TestScheduler.parseMarblesAsSubscriptions(marbles);
                });
                expect(results).toEqual(actual.getSubscriptions());
                return { pass: true };
            },
        }); },
        toBeObservable: function () { return ({
            compare: function (actual, fixture) {
                var results = [];
                var subscription;
                var scheduler = getTestScheduler();
                scheduler.schedule(function () {
                    subscription = actual.subscribe(function (x) {
                        var value = x;
                        // Support Observable-of-Observables
                        if (x instanceof Observable) {
                            value = materializeInnerObservable(value, scheduler.frame);
                        }
                        results.push({
                            frame: scheduler.frame,
                            notification: Notification.createNext(value),
                        });
                    }, function (err) {
                        results.push({
                            frame: scheduler.frame,
                            notification: Notification.createError(err),
                        });
                    }, function () {
                        results.push({
                            frame: scheduler.frame,
                            notification: Notification.createComplete(),
                        });
                    });
                });
                scheduler.flush();
                var expected = TestScheduler.parseMarbles(fixture.marbles, fixture.values, fixture.error, true);
                expect(results).toEqual(expected);
                return { pass: true };
            },
        }); },
    });
}
if (typeof module === 'object' && module.exports) {
    jasmine.getEnv().beforeAll(function () { return addMatchers(); });
    jasmine.getEnv().beforeEach(function () { return initTestScheduler(); });
    jasmine.getEnv().afterEach(function () {
        getTestScheduler().flush();
        resetTestScheduler();
    });
}
//# sourceMappingURL=index.js.map
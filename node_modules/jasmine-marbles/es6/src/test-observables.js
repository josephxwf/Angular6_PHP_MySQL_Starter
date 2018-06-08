var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Observable } from 'rxjs';
import { getTestScheduler } from './scheduler';
var TestColdObservable = /** @class */ (function (_super) {
    __extends(TestColdObservable, _super);
    function TestColdObservable(marbles, values, error) {
        var _this = _super.call(this) || this;
        _this.marbles = marbles;
        _this.values = values;
        _this.error = error;
        _this.source = getTestScheduler().createColdObservable(marbles, values, error);
        return _this;
    }
    TestColdObservable.prototype.getSubscriptions = function () {
        return this.source['subscriptions'];
    };
    return TestColdObservable;
}(Observable));
export { TestColdObservable };
var TestHotObservable = /** @class */ (function (_super) {
    __extends(TestHotObservable, _super);
    function TestHotObservable(marbles, values, error) {
        var _this = _super.call(this) || this;
        _this.marbles = marbles;
        _this.values = values;
        _this.error = error;
        _this.source = getTestScheduler().createHotObservable(marbles, values, error);
        return _this;
    }
    TestHotObservable.prototype.getSubscriptions = function () {
        return this.source['subscriptions'];
    };
    return TestHotObservable;
}(Observable));
export { TestHotObservable };
//# sourceMappingURL=test-observables.js.map
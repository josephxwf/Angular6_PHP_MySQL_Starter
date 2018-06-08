import { Observable } from 'rxjs';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';
export declare class TestColdObservable extends Observable<any> {
    marbles: string;
    values: any[] | undefined;
    error: any;
    constructor(marbles: string, values?: any[] | undefined, error?: any);
    getSubscriptions(): SubscriptionLog[];
}
export declare class TestHotObservable extends Observable<any> {
    marbles: string;
    values: any[] | undefined;
    error: any;
    constructor(marbles: string, values?: any[] | undefined, error?: any);
    getSubscriptions(): SubscriptionLog[];
}
export declare type TestObservable = TestColdObservable | TestHotObservable;

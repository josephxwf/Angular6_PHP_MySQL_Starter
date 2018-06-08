import { TestColdObservable, TestHotObservable } from './src/test-observables';
export { getTestScheduler, initTestScheduler, resetTestScheduler } from './src/scheduler';
export declare function hot(marbles: string, values?: any, error?: any): TestHotObservable;
export declare function cold(marbles: string, values?: any, error?: any): TestColdObservable;
export declare function time(marbles: string): number;
declare global  {
    namespace jasmine {
        interface Matchers<T> {
            toBeObservable: any;
            toHaveSubscriptions: any;
        }
    }
}
export declare function addMatchers(): void;

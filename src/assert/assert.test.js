import { assert, ruleFactory } from './assert';

describe('assert', () => {
    // TODO
    // it('should call all given rule functions when an array of rule functions is passed', () => {
    //     expect();
    // });
    //
    // it('should throw when an assertion fails', () => {
    //     expect(assert('', '', [])).toThrow();
    // });
    //
    // it('should not throw when all assertions pass', () => {
    //     expect(assert('', '', [])).not.toThrow();
    // });

    it('should not throw when an empty rules array is passed', () => {
        expect(() => assert('', '', [])).not.toThrow();
    });
});

describe('addRule', () => {
    // Clears the registered rules that were added by `addRule` via side-effects
    afterEach(() => {
        jest.resetModules();
    });

    it('should create an assert property for the new rule', () => {
        import('./assert').then(({ addRule }) => {
            const ruleFactoryMock = jest.spyOn({ ruleFactory }, 'ruleFactory');
            ruleFactoryMock.mockImplementation(() => {
                const rule = () => null;
                rule.template = '';
                rule.options = '';
                return rule;
            });

            addRule('test', () => null, 'test');

            // ruleFactoryMock.mockRestore();

            expect(assert).toHaveProperty('test');
        });
    });

    it('should throw when another rule with the same name already exists', () => {
        import('./assert').then(({ addRule }) => {
            addRule('test', () => null, 'test');
            expect(() => addRule('test', () => null, 'test')).toThrow('Rule \'test\' already exists');
        });
    });
});

describe('ruleFactory', () => {
    it('should return a function with properties template and option', () => {
        const actual = ruleFactory(() => null, 'test');
        expect(typeof actual).toBe('function');
        expect(actual).toHaveProperty('template');
        expect(actual).toHaveProperty('options');
    });

    // TODO: add more tests
});

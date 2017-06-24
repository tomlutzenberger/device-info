/**
 * DeviceInfo v0.1
 * Dynamic Bookmarklet to quickly access the backend of your tool
 *
 * Copyright (c) 2017 - Tom Lutzenberger (lutzenbergerthomas at gmail dot com)
 * https://github.com/tomlutzenberger/device-info
 *
 * @license: Licensed under the MIT license
 * https://github.com/tomlutzenberger/device-info/blob/master/LICENSE
 * https://tomlutzenberger.github.io/device-info/
 */

/*global global,window,document,require,describe,it*/
/*jslint esnext:true */

const assert = require('assert');
const rewire = require('rewire');


const read = require('read-file');
var html = read.sync('./index.html', 'utf8');


const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const options = {};
const dom = new JSDOM(html, options);

global.window = dom.window;
global.document = dom.window.document;


const script = rewire('../js/deviceinfo.js');
const DeviceInfo = script.__get__('DeviceInfo');

const ZERO = 0;


describe('DeviceInfo', () => {


    /**
     * @description Main functions
     *
     */
    describe('#DeviceInfo()', () => {
        it('should return an object', () => {
            assert.ok(typeof DeviceInfo() === 'object');
        });
    });

    describe('#DeviceInfo().log()', () => {
        it('should succeed for valid console function', () => {
            assert.ok(DeviceInfo().log('debug', 'test'));
        });
        it('should fail for invalid console function', () => {
            assert.ok(DeviceInfo().log('something', 'test') === false);
        });
        it('should fail for missing param', () => {
            assert.ok(DeviceInfo().log('debug') === false);
        });
    });

    describe('#DeviceInfo().mergeValues()', () => {
        it('should merge identical values', () => {
            assert.equal(DeviceInfo().mergeValues('test', 'test'), 'test');
        });
        it('should concat different values', () => {
            assert.equal(DeviceInfo().mergeValues('test1', 'test2'), 'test1 test2');
        });
        it('should concat different values with non-default delimiter', () => {
            assert.equal(DeviceInfo().mergeValues('test1', 'test2', '&'), 'test1&test2');
        });
    });

    describe('#DeviceInfo().typeCheck()', () => {
        it('should succeed on integer', () => {
            const testValue = 123;
            assert.equal(DeviceInfo().typeCheck(testValue, 'test'), testValue);
        });
        it('should succeed on strings', () => {
            const testValue = 'lorem-ipsum';
            assert.equal(DeviceInfo().typeCheck(testValue, 'test'), testValue);
        });
        it('should fail on undefined', () => {
            assert.ok(DeviceInfo().typeCheck(undefined, 'test') === 'undefined');
        });
        it('should fail on null', () => {
            assert.ok(DeviceInfo().typeCheck(null, 'test') === 'undefined');
        });
    });

    describe('#DeviceInfo().injectIntoDom()', () => {
        it('should succeed on existing DOM elements', () => {
            assert.ok(DeviceInfo().injectIntoDom('window-size', 'Maximized'));
        });
        it('should succeed on existing DOM elements', () => {
            assert.ok(DeviceInfo().injectIntoDom('lorem-ipsum', 'test') === false);
        });
    });



    /**
     * @description Window functions
     *
     */
    describe('DeviceInfo.win', () => {

        describe('#win', () => {
            it('should return an object', () => {
                assert.ok(typeof DeviceInfo().win === 'object');
            });
            it('should not be an empty object', () => {
                assert.ok(Object.keys(DeviceInfo().win).length > ZERO);
            });
        });


        describe('#getInnerWidth()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().win.getInnerWidth()));
            });
            it('should be greater than zero', () => {
                assert.ok(DeviceInfo().win.getInnerWidth() > ZERO);
            });
        });


        describe('#getInnerHeight()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().win.getInnerHeight()));
            });
            it('should be greater than zero', () => {
                assert.ok(DeviceInfo().win.getInnerHeight() > ZERO);
            });
        });


        describe('#setWindowInnerDimension()', () => {
            it('should return true', () => {
                assert.ok(DeviceInfo().win.setWindowInnerDimension());
            });
            it('should set content to "1024x768"', () => {
                DeviceInfo().win.setWindowInnerDimension();
                const content = document.getElementById('window-inner-dimension').lastElementChild.textContent;
                assert.ok(content === '1024x768');
            });
        });


        describe('#getOuterWidth()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().win.getOuterWidth()));
            });
            it('should be greater than zero', () => {
                assert.ok(DeviceInfo().win.getOuterWidth() > ZERO);
            });
        });


        describe('#getOuterHeight()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().win.getOuterHeight()));
            });
            it('should be greater than zero', () => {
                assert.ok(DeviceInfo().win.getOuterHeight() > ZERO);
            });
        });


        describe('#setWindowOuterDimension()', () => {
            it('should return true', () => {
                assert.ok(DeviceInfo().win.setWindowOuterDimension());
            });
            it('should set content to "1024x768"', () => {
                DeviceInfo().win.setWindowOuterDimension();
                const content = document.getElementById('window-outer-dimension').lastElementChild.textContent;
                assert.ok(content === '1024x768');
            });
        });


        describe('#getMaxWidth()', () => {
            it('should return an integer', () => {
                if (window.screen.availWidth !== undefined) {
                    assert.ok(Number.isInteger(DeviceInfo().win.getMaxWidth()));
                }
            });
            it('should be greater than zero', () => {
                if (window.screen.availWidth !== undefined) {
                    assert.ok(DeviceInfo().win.getMaxWidth() > ZERO);
                }
            });
        });


        describe('#getMaxHeight()', () => {
            it('should return an integer', () => {
                if (window.screen.availHeight !== undefined) {
                    assert.ok(Number.isInteger(DeviceInfo().win.getMaxHeight()));
                }
            });
            it('should be greater than zero', () => {
                if (window.screen.availHeight !== undefined) {
                    assert.ok(DeviceInfo().win.getMaxHeight() > ZERO);
                }
            });
        });


        describe('#setWindowMaxDimension()', () => {
            it('should return true', () => {
                if (window.screen.availWidth !== undefined && window.screen.availHeight !== undefined) {
                    assert.ok(DeviceInfo().win.setWindowMaxDimension());
                }
            });
            it('should set content to "1024x768"', () => {
                if (window.screen.availWidth !== undefined && window.screen.availHeight !== undefined) {
                    DeviceInfo().win.setWindowMaxDimension();
                    const content = document.getElementById('window-max-dimension').lastElementChild.textContent;
                    assert.ok(content === '1024x768');
                }
            });
        });
    });



    /**
     * @description Screen functions
     *
     */
    describe('DeviceInfo.screen', () => {

        describe('#screen', () => {
            it('should return an object', () => {
                assert.ok(typeof DeviceInfo().screen === 'object');
            });
            it('should not be an empty object', () => {
                assert.ok(Object.keys(DeviceInfo().screen).length > ZERO);
            });
        });


        describe('#getWidth()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().screen.getWidth()));
            });
        });


        describe('#getHeight()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().screen.getHeight()));
            });
        });


        describe('#setDimension()', () => {
            it('should return true', () => {
                assert.ok(DeviceInfo().screen.setDimension());
            });
            it('should set content to "0x0"', () => {
                // Because jsDOM's window is 0x0 pixel
                DeviceInfo().screen.setDimension();
                const content = document.getElementById('screen-dimension').lastElementChild.textContent;
                assert.ok(content === '0x0');
            });
        });


        describe('#getPixelRatio()', () => {
            it('should return an integer', () => {
                if (window.devicePixelRatio !== undefined) {
                    assert.ok(Number.isInteger(DeviceInfo().screen.getPixelRatio()));
                }
            });
            it('should be greater than zero', () => {
                if (window.devicePixelRatio !== undefined) {
                    assert.ok(DeviceInfo().screen.getPixelRatio() > ZERO);
                }
            });
        });


        describe('#setPixelRatio()', () => {
            it('should return true', () => {
                if (window.devicePixelRatio !== undefined) {
                    assert.ok(DeviceInfo().screen.setPixelRatio());
                }
            });
            it('should set content to "1x"', () => {
                if (window.devicePixelRatio !== undefined) {
                    DeviceInfo().screen.setPixelRatio();
                    const content = document.getElementById('screen-pixel-ratio').lastElementChild.textContent;
                    assert.ok(content === '1x');
                }
            });
        });


        describe('#getColorDepth()', () => {
            it('should return an integer', () => {
                if (window.screen.colorDepth !== undefined) {
                    assert.ok(Number.isInteger(DeviceInfo().screen.getColorDepth()));
                }
            });
            it('should be greater than zero', () => {
                if (window.screen.colorDepth !== undefined) {
                    assert.ok(DeviceInfo().screen.getColorDepth() > ZERO);
                }
            });
        });


        describe('#setColorDepth()', () => {
            it('should return true', () => {
                if (window.screen.colorDepth !== undefined) {
                    assert.ok(DeviceInfo().screen.setColorDepth());
                }
            });
            it('should set content to "24Bit"', () => {
                if (window.screen.colorDepth !== undefined) {
                    DeviceInfo().screen.setColorDepth();
                    const content = document.getElementById('screen-color-depth').lastElementChild.textContent;
                    assert.ok(content === '24Bit');
                }
            });
        });


        describe('#getScreenType()', () => {
            it('should return a string', () => {
                assert.ok(typeof DeviceInfo().screen.getScreenType() === 'string');
            });
        });


        describe('#setScreenType()', () => {
            it('should return true', () => {
                assert.ok(DeviceInfo().screen.setScreenType());
            });
            it('should set content to "Primary Screen"', () => {
                DeviceInfo().screen.setScreenType();
                const content = document.getElementById('screen-type').lastElementChild.textContent;
                assert.ok(content === 'Primary Screen');
            });
        });


        describe('#getScreenPosition()', () => {
            it('should return a string', () => {
                assert.ok(typeof DeviceInfo().screen.getScreenPosition() === 'string');
            });
        });


        describe('#setScreenPosition()', () => {
            it('should return true', () => {
                assert.ok(DeviceInfo().screen.setScreenPosition());
            });
            it('should set content to "Center"', () => {
                DeviceInfo().screen.setScreenPosition();
                const content = document.getElementById('screen-position').lastElementChild.textContent;
                assert.ok(content === 'Center');
            });
        });


    });

});


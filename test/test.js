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
const dom = new JSDOM(html);

global.window = dom.window;
global.document = dom.window.document;


const script = rewire('../js/deviceinfo.js');
const DeviceInfo = script.__get__('DeviceInfo');


describe('DeviceInfo', () => {

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

    describe('#DeviceInfo().injectIntoDom()', () => {
        it('should succeed on existing DOM elements', () => {
            assert.ok(DeviceInfo().injectIntoDom('window-size', 'Maximized'));
        });
        it('should succeed on existing DOM elements', () => {
            assert.ok(DeviceInfo().injectIntoDom('lorem-ipsum', 'test') === false);
        });
    });

    describe('DeviceInfo.win', () => {

        describe('#win', () => {
            it('should return an object', () => {
                assert.ok(typeof DeviceInfo().win === 'object');
            });
            it('should not be an empty object', () => {
                assert.ok(Object.keys(DeviceInfo().win).length > 0);
            });
        });


        describe('#getWindowInnerWidth()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().win.getWindowInnerWidth()));
            });
            it('should be greater than zero', () => {
                assert.ok(DeviceInfo().win.getWindowInnerWidth() > 0);
            });
        });


        describe('#getWindowInnerHeight()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().win.getWindowInnerHeight()));
            });
            it('should be greater than zero', () => {
                assert.ok(DeviceInfo().win.getWindowInnerHeight() > 0);
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


        describe('#getWindowOuterWidth()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().win.getWindowOuterWidth()));
            });
            it('should be greater than zero', () => {
                assert.ok(DeviceInfo().win.getWindowOuterWidth() > 0);
            });
        });


        describe('#getWindowOuterHeight()', () => {
            it('should return an integer', () => {
                assert.ok(Number.isInteger(DeviceInfo().win.getWindowOuterHeight()));
            });
            it('should be greater than zero', () => {
                assert.ok(DeviceInfo().win.getWindowOuterHeight() > 0);
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


        describe('#getWindowMaxWidth()', () => {
            it('should return an integer', () => {
                if (window.screen.availWidth !== undefined) {
                    assert.ok(Number.isInteger(DeviceInfo().win.getWindowMaxWidth()));
                }
            });
            it('should be greater than zero', () => {
                if (window.screen.availWidth !== undefined) {
                    assert.ok(DeviceInfo().win.getWindowMaxWidth() > 0);
                }
            });
        });


        describe('#getWindowMaxHeight()', () => {
            it('should return an integer', () => {
                if (window.screen.availHeight !== undefined) {
                    assert.ok(Number.isInteger(DeviceInfo().win.getWindowMaxHeight()));
                }
            });
            it('should be greater than zero', () => {
                if (window.screen.availHeight !== undefined) {
                    assert.ok(DeviceInfo().win.getWindowMaxHeight() > 0);
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

});


/*!
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

/*globals document,window*/
/*jslint esnext:true */

/**
 * @method DeviceInfo
 * @description Main object for the application
 *
 * @returns {Object} Returns public methods
 */
const DeviceInfo = () => {

    const ZERO = 0;
    const WINDOW_MIN_WIDTH = 160;
    const WINDOW_MIN_HEIGHT = 28;

    /**
     * @property win
     * @description Wraps all window methods
     */
    const win = {

        /**
         * @method getInnerWidth
         * @description Get inner window width or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getInnerWidth: () => {
            return typeCheck(window.innerWidth, 'window.innerWidth');
        },


        /**
         * @method getInnerHeight
         * @description Get inner window height or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getInnerHeight: () => {
            return typeCheck(window.innerHeight, 'window.innerHeight');
        },


        /**
         * @method setWindowInnerDimension
         * @description Injects the inner window dimension into the DOM
         *
         * @returns {Boolean}
         */
        setWindowInnerDimension: () => {
            const content = `${win.getInnerWidth()}x${win.getInnerHeight()}`;
            return injectIntoDom('window-inner-dimension', content);
        },

        /**
         * @method getOuterWidth
         * @description Get outer window width or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getOuterWidth: () => {
            return typeCheck(window.outerWidth, 'window.outerWidth');
        },


        /**
         * @method getOuterHeight
         * @description Get outer window height or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getOuterHeight: () => {
            return typeCheck(window.outerHeight, 'window.outerHeight');
        },


        /**
         * @method setWindowOuterDimension
         * @description Injects the outer window dimension into the DOM
         *
         * @returns {Boolean}
         */
        setWindowOuterDimension: () => {
            const content = `${win.getOuterWidth()}x${win.getOuterHeight()}`;
            return injectIntoDom('window-outer-dimension', content);
        },


        /**
         * @method getMaxWidth
         * @description Get maximum window width or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getMaxWidth: () => {
            return typeCheck(window.screen.availWidth, 'window.screen.availWidth');
        },


        /**
         * @method getMaxHeight
         * @description Get maximum window height or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getMaxHeight: () => {
            return typeCheck(window.screen.availHeight, 'window.screen.availHeight');
        },


        /**
         * @method setWindowMaxDimension
         * @description Injects the window dimension into the DOM
         *
         * @returns {Boolean}
         */
        setWindowMaxDimension: () => {
            const content = `${win.getMaxWidth()}x${win.getMaxHeight()}`;
            return injectIntoDom('window-max-dimension', content);
        },


        /**
         * @method getSize
         * @description Get window size
         *
         * @returns {String}
         */
        getSize: () => {
            let windowSize = '';

            if (window.fullScreen) {
                windowSize = 'Fullscreen';
            } else if (win.getOuterWidth() === window.screen.availWidth &&
                        win.getOuterHeight() === window.screen.availHeight) {
                windowSize = 'Maximized';
            } else if (win.getOuterWidth() === WINDOW_MIN_WIDTH &&
                        win.getOuterHeight() === WINDOW_MIN_HEIGHT) {
                windowSize = 'Minimized';
            } else {
                windowSize = 'Restored';
            }

            return windowSize;
        },


        /**
         * @method setWindowSize
         * @description Injects the window size into the DOM
         *
         * @returns {Boolean}
         */
        setWindowSize: () => {
            const content = `${win.getSize()}`;
            return injectIntoDom('window-size', content);
        }
    };



    /**
     * @property screen
     * @description Wraps all screen methods
     */
    const screen = {

        /**
         * @method getWidth
         * @description Get screen width or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getWidth: () => {
            return typeCheck(window.screen.width, 'window.screen.width');
        },


        /**
         * @method getHeight
         * @description Get screen height or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getHeight: () => {
            return typeCheck(window.screen.height, 'window.screen.height');
        },


        /**
         * @method setDimension
         * @description Injects the screen dimension into the DOM
         *
         * @returns {void}
         */
        setDimension: () => {
            const content = `${screen.getWidth()}x${screen.getHeight()}`;
            return injectIntoDom('screen-dimension', content);
        },


        /**
         * @method getPixelRatio
         * @description Get screen pixel ratio or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getPixelRatio: () => {
            return typeCheck(window.devicePixelRatio, 'window.devicePixelRatio');
        },


        /**
         * @method setPixelRatio
         * @description Injects the pixel ratio into the DOM
         *
         * @returns {void}
         */
        setPixelRatio: () => {
            const content = `${screen.getPixelRatio()}x`;
            return injectIntoDom('screen-pixel-ratio', content);
        },


        /**
         * @method getColorDepth
         * @description Get screen color depth or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getColorDepth: () => {
            return typeCheck(window.screen.colorDepth, 'window.screen.colorDepth');
        },


        /**
         * @method setColorDepth
         * @description Injects the pixel ratio into the DOM
         *
         * @returns {void}
         */
        setColorDepth: () => {
            const content = `${screen.getColorDepth()} Bit`;
            return injectIntoDom('screen-color-depth', content);
        },


        /**
         * @method getScreenType
         * @description Get screen type by window position
         *
         * @returns {String}
         */
        getScreenType: () => {
            let isPrimary = true;

            if (window.screenX < ZERO ||
                window.screenY < ZERO ||
                window.screenX > win.getMaxWidth() ||
                window.screenY > win.getMaxHeight()) {
                isPrimary = false;
            }

            return isPrimary ? 'Primary' : 'Secondary';
        },


        /**
         * @method setScreenType
         * @description Injects the screen type into the DOM
         *
         * @returns {void}
         */
        setScreenType: () => {
            const content = `${screen.getScreenType()} Screen`;
            return injectIntoDom('screen-type', content);
        },


        /**
         * @method getScreenPosition
         * @description Get screen position
         *
         * @returns {String}
         */
        getScreenPosition: () => {
            let positionX = '';
            let positionY = '';

            if (window.screenX < ZERO) {
                positionX = 'Left';
            } else if (window.screenX > win.getMaxWidth()) {
                positionX = 'Right';
            } else {
                positionX = 'Center';
            }

            if (window.screenY < ZERO) {
                positionY = 'Top';
            } else if (window.screenY > win.getMaxHeight()) {
                positionY = 'Bottom';
            } else {
                positionY = 'Center';
            }

            return positionX === positionY ? positionX : positionX + ' ' + positionY;
        },


        /**
         * @method setScreenPosition
         * @description Injects the screen position into the DOM
         *
         * @returns {void}
         */
        setScreenPosition: () => {
            const content = `${screen.getScreenPosition()}`;
            return injectIntoDom('screen-position', content);
        }
    };



    /**
     * @method log
     * @description Passed parameters will be logged to the console. First parameter defines the log-level
     *
     * @param {String} logLevel - The level in which the message should be logged (log, debug, error, ...)
     * @param {...*} logParams - Variable amount of mixed parameters
     * @return {Boolean}
     */
    const log = (logLevel, ...logParams) => {

        const MIN_PARAM_COUNT = 2;

        // Overwrite console to prevent eslint "no-console" errors
        const LOGGER = window.console;

        // Convert logParams object to array
        let params = Object.keys(logParams).map(index => logParams[index]);
        params.unshift('[DeviceInfo]');

        // only continue in Dev-Mode and if there are more than 1 log params
        if(params.length >= MIN_PARAM_COUNT) {
            if(typeof LOGGER[logLevel] === 'function') {
                LOGGER[logLevel].apply(console, params);
                return true;
            } else {
                LOGGER.error('console.' + logLevel + ' is not a valid logging function.');
                LOGGER.debug.apply(console, params);
                return false;
            }
        }

        return false;
    };



    /**
     * @method typeCheck
     * @description Tests if given value may be undefined and return "undefined"if so, otherwise return original value
     *
     * @param {*} value - Value to be tested
     * @param {String} name - Name of the value
     * @return {*}
     */
    const typeCheck = (value, name) => {
        if (value === undefined || value === null) {
            log('warn', `${name} is undefined (=${value})`);
            return 'undefined';
        } else {
            return value;
        }
    };



    /**
     * @method injectIntoDom
     * @description Injects text/html into DOM
     *
     * @param {String} domElementId - The ID of the DOM element into which should be injected
     * @param {String} content - Content to be injected
     * @return {Boolean}
     */
    const injectIntoDom = (domElementId, content) => {
        const element = document.getElementById(domElementId);
        if (element !== null) {
            const elementClass = content === 'undefined' ? 'text-danger' : 'text-success';
            element.lastElementChild.innerHTML = `<span class="${elementClass}">${content}</span>`;
            return true;
        } else {
            log('error', '#window-max-dimension is not a DOM element');
            return false;
        }
    };



    /**
     * @method execute
     * @description Executes the application
     *
     * @returns {void}
     */
    const execute = () => {
        win.setWindowInnerDimension();
        win.setWindowOuterDimension();
        win.setWindowMaxDimension();
        win.setWindowSize();

        screen.setDimension();
        screen.setPixelRatio();
        screen.setColorDepth();
        screen.setScreenType();
        screen.setScreenPosition();
    };


    return {execute, log, typeCheck, injectIntoDom, win, screen};
};

const di = DeviceInfo();
di.execute();

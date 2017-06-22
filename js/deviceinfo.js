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

/*globals document,window*/
/*jslint esnext:true */

/**
 * @method DeviceInfo
 * @description Main object for the application
 *
 * @returns {Object} Returns public methods
 */
const DeviceInfo = () => {


    /**
     * @property win
     * @description Wraps all window methods
     */
    const win = {

        /**
         * @method getWindowInnerWidth
         * @description Get inner window width or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getWindowInnerWidth: () => {
            return window.innerWidth || 'undefined';
        },


        /**
         * @method getWindowInnerHeight
         * @description Get inner window height or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getWindowInnerHeight: () => {
            return window.innerHeight || 'undefined';
        },


        /**
         * @method setWindowInnerDimension
         * @description Injects the inner window dimension into the DOM
         *
         * @returns {Boolean}
         */
        setWindowInnerDimension: () => {
            const content = `${win.getWindowInnerWidth()}x${win.getWindowInnerHeight()}`;
            return injectIntoDom('window-inner-dimension', content);
        },

        /**
         * @method getWindowOuterWidth
         * @description Get outer window width or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getWindowOuterWidth: () => {
            return window.outerWidth || 'undefined';
        },


        /**
         * @method getWindowOuterHeight
         * @description Get outer window height or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getWindowOuterHeight: () => {
            return window.outerHeight || 'undefined';
        },


        /**
         * @method setWindowOuterDimension
         * @description Injects the outer window dimension into the DOM
         *
         * @returns {Boolean}
         */
        setWindowOuterDimension: () => {
            const content = `${win.getWindowOuterWidth()}x${win.getWindowOuterHeight()}`;
            return injectIntoDom('window-outer-dimension', content);
        },


        /**
         * @method getWindowMaxWidth
         * @description Get maximum window width or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getWindowMaxWidth: () => {
            return window.screen.availWidth || 'undefined';
        },


        /**
         * @method getWindowMaxHeight
         * @description Get maximum window height or a string "undefined" if not available
         *
         * @returns {(Number|String)}
         */
        getWindowMaxHeight: () => {
            return window.screen.availHeight || 'undefined';
        },


        /**
         * @method setWindowMaxDimension
         * @description Injects the window dimension into the DOM
         *
         * @returns {Boolean}
         */
        setWindowMaxDimension: () => {
            const content = `${win.getWindowMaxWidth()}x${win.getWindowMaxHeight()}`;
            return injectIntoDom('window-max-dimension', content);
        },


        /**
         * @method getWindowSize
         * @description Get window size
         *
         * @returns {String}
         */
        getWindowSize: () => {
            const WINDOW_MIN_WIDTH = 160;
            const WINDOW_MIN_HEIGHT = 28;
            let windowSize = '';

            if (window.fullScreen) {
                windowSize = 'Fullscreen';
            } else if (win.getWindowOuterWidth() === window.screen.availWidth &&
                        win.getWindowOuterHeight() === window.screen.availHeight) {
                windowSize = 'Maximized';
            } else if (win.getWindowOuterWidth() === WINDOW_MIN_WIDTH &&
                        win.getWindowOuterHeight() === WINDOW_MIN_HEIGHT) {
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
            const content = `${win.getWindowSize()}`;
            return injectIntoDom('window-size', content);
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
    };


    return {execute, log, injectIntoDom, win};
};

const di = DeviceInfo();
di.execute();

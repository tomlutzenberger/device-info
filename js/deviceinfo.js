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
            const windowInnerDimension = document.getElementById('window-inner-dimension');

            if (windowInnerDimension !== null) {
                windowInnerDimension.lastElementChild.innerHTML = `${win.getWindowInnerWidth()}x${win.getWindowInnerHeight()}`;
                return true;
            } else {
                console.error('#window-inner-dimension is not a DOM element');
                return false;
            }
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
            const windowOuterDimension = document.getElementById('window-outer-dimension');

            if (windowOuterDimension !== null) {
                windowOuterDimension.lastElementChild.innerHTML = `${win.getWindowOuterWidth()}x${win.getWindowOuterHeight()}`;
                return true;
            } else {
                console.error('#window-outer-dimension is not a DOM element');
                return false;
            }
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
            const windowMaxDimension = document.getElementById('window-max-dimension');
            if (windowMaxDimension !== null) {
                windowMaxDimension.lastElementChild.innerHTML = `${win.getWindowMaxWidth()}x${win.getWindowMaxHeight()}`;
                return true;
            } else {
                console.error('#window-max-dimension is not a DOM element');
                return false;
            }
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
            const windowSize = document.getElementById('window-size');
            if (windowSize !== null) {
                windowSize.lastElementChild.innerHTML = `${win.getWindowSize()}`;
                return true;
            } else {
                console.error('#window-size is not a DOM element');
                return false;
            }
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


    return {execute, win};
};

const di = DeviceInfo();
di.execute();

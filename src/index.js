/*!
 * Copyright (c) 2017 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');
var ReadStreaming = require('./read-streaming');

module.exports = driver({
    attach: function (inputs, context) {
        var that = this;
        this._rs485 = inputs['rs485'];
        this._readStream = new ReadStreaming(this._rs485);

        this._readStream.on('data', function (data) {
            that.emit('data', data);
        });

        this._readStream.start();
    },
    detach: function (callback) {
        this._rs485.close();
    },
    exports: {
        write: function (data, callback) {
            this._rs485.write(data, callback);
        }
    }
});

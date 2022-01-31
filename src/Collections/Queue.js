var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Dictionary", "../Utility"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LabelledCircularQueue = exports.CircularBufferQueue = exports.DoubleStackQueue = void 0;
    var Dict = require("./Dictionary");
    var Util = require("../Utility");
    var DoubleStackQueue = (function () {
        function DoubleStackQueue() {
            this.incoming = [];
            this.outgoing = [];
            this.size = 0;
        }
        DoubleStackQueue.prototype.Shift = function () {
            while (this.incoming.length > 0) {
                var last = this.incoming.pop();
                this.outgoing.push(last);
            }
        };
        DoubleStackQueue.prototype.Enqueue = function (value) {
            this.size += 1;
            this.incoming.push(value);
        };
        DoubleStackQueue.prototype.Peek = function () {
            if (this.outgoing.length == 0) {
                this.Shift();
            }
            return this.outgoing[this.outgoing.length - 1];
        };
        DoubleStackQueue.prototype.Dequeue = function () {
            if (this.outgoing.length == 0) {
                this.Shift();
            }
            this.size -= 1;
            return this.outgoing.pop();
        };
        DoubleStackQueue.prototype.Count = function () {
            return this.size;
        };
        return DoubleStackQueue;
    }());
    exports.DoubleStackQueue = DoubleStackQueue;
    var CircularBufferQueue = (function () {
        function CircularBufferQueue(initialSize) {
            if (initialSize === void 0) { initialSize = 32; }
            this.head = 0;
            this.tail = 0;
            this.count = 0;
            this.buffer = new Array(initialSize);
        }
        CircularBufferQueue.prototype.Resize = function (currentSize, newSize) {
            var resized = new Array(newSize);
            for (var i = 0; i < currentSize; i++) {
                var ind = (this.tail + i) % currentSize;
                resized[i] = this.buffer[ind];
            }
            this.buffer = resized;
            this.tail = 0;
            this.head = this.count;
        };
        CircularBufferQueue.prototype.Enqueue = function (value) {
            this.count++;
            this.buffer[this.head] = value;
            this.head = (this.head + 1);
            if (this.head >= this.buffer.length) {
                this.head = 0;
            }
            if (this.head == this.tail) {
                this.Resize(this.buffer.length, this.buffer.length * 2);
            }
        };
        CircularBufferQueue.prototype.Peek = function () {
            return this.buffer[this.tail];
        };
        CircularBufferQueue.prototype.Dequeue = function () {
            this.count -= 1;
            var element = this.buffer[this.tail];
            this.tail++;
            if (this.tail >= this.buffer.length) {
                this.tail = 0;
            }
            return element;
        };
        CircularBufferQueue.prototype.Count = function () {
            return this.count;
        };
        return CircularBufferQueue;
    }());
    exports.CircularBufferQueue = CircularBufferQueue;
    var LabelledCircularQueue = (function (_super) {
        __extends(LabelledCircularQueue, _super);
        function LabelledCircularQueue(initialSize) {
            if (initialSize === void 0) { initialSize = 32; }
            var _this = _super.call(this, initialSize) || this;
            _this.skip = Util.Fill(initialSize, false);
            _this.indices = new Dict.ObjectDict();
            return _this;
        }
        LabelledCircularQueue.prototype.ResizeBuffers = function (currentSize, newSize) {
            var resizedSkip = new Array(newSize);
            var resizedBuffer = new Array(newSize);
            var newDict = new Dict.ObjectDict();
            var destInd = 0;
            for (var i = 0; i < currentSize; i++) {
                var ind = (this.tail + i) % currentSize;
                if (this.skip[ind])
                    continue;
                var currentValue = this.buffer[ind];
                resizedBuffer[destInd] = currentValue;
                resizedSkip[destInd] = false;
                newDict.Set(currentValue, destInd);
                destInd++;
            }
            this.indices = newDict;
            this.buffer = resizedBuffer;
            this.skip = resizedSkip;
            this.tail = 0;
            this.head = this.count;
        };
        LabelledCircularQueue.prototype.Contains = function (value) {
            return this.indices.ContainsKey(value);
        };
        LabelledCircularQueue.prototype.Remove = function (value) {
            this.count--;
            var ind = this.indices.Get(value);
            if (!this.indices.ContainsKey(value)) {
                throw new Error("queue does not contain element " + value);
            }
            this.indices.Remove(value);
            this.skip[ind] = true;
        };
        LabelledCircularQueue.prototype.Enqueue = function (value) {
            this.count++;
            this.skip[this.head] = false;
            this.buffer[this.head] = value;
            if (this.indices.ContainsKey(value)) {
                throw new Error("Queue contains duplicate " + value);
            }
            this.indices.Set(value, this.head);
            this.head++;
            if (this.head >= this.buffer.length) {
                this.head = 0;
            }
            if (this.head == this.tail) {
                this.ResizeBuffers(this.buffer.length, this.buffer.length * 2);
            }
        };
        LabelledCircularQueue.prototype.MoveToValid = function () {
            while (this.skip[this.tail]) {
                this.tail = (this.tail + 1) % this.skip.length;
            }
        };
        LabelledCircularQueue.prototype.Peek = function () {
            this.MoveToValid();
            return _super.prototype.Peek.call(this);
        };
        LabelledCircularQueue.prototype.Dequeue = function () {
            this.MoveToValid();
            var dequeued = _super.prototype.Dequeue.call(this);
            if (!this.indices.ContainsKey(dequeued)) {
                throw new Error("queue does not contain element " + dequeued);
            }
            this.indices.Remove(dequeued);
            return dequeued;
        };
        return LabelledCircularQueue;
    }(CircularBufferQueue));
    exports.LabelledCircularQueue = LabelledCircularQueue;
});
//# sourceMappingURL=Queue.js.map
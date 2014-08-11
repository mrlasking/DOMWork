!function (window) {

    var DOMWork = function () {
        this.elements = [];
    };

    function DW() {
        return new DOMWork();
    }

    DOMWork.prototype.getById = DOMWork.prototype.byId = function (id) {
        this.elements = [];
        this.elements.push(document.getElementById(id));
        return this;
    };

    DOMWork.prototype.getByClass = DOMWork.prototype.byClass = function (className) {
        this.elements = [];
        this.elements = [].slice.call(document.getElementsByClassName(className), 0);
        return this;
    };

    DOMWork.prototype.createByTag = function (tag) {
        this.elements = [];
        this.elements.push(document.createElement(tag));
        return this;
    };

    DOMWork.prototype.insHTML = function (html) {
        this.elements.map(function (elem) {
            elem.innerHTML = html;
        });

        return this;
    };

    DOMWork.prototype.appendTo = function (obj) {
        this.elements.forEach(function (elem) {
            obj.elements[0].appendChild(elem);
        });

        return this;
    };

    DOMWork.prototype.toggleClass = function (classes) {
        return classWork.apply(this, [classes, 'toggle']);
    };

    DOMWork.prototype.addClass = function (classes) {
        return classWork.apply(this, [classes, 'add']);
    };

    DOMWork.prototype.removeClass = function (classes) {
        return classWork.apply(this, [classes, 'remove']);
    };

    function classWork(classes, action) {

        var targets = this.elements;

        targets.forEach(function (target) {

            var clArr = target.className.split(/\s+/i);
            var addedClasses = classes.split(/\s+/i);

            addedClasses.forEach(function (classes) {

                var index = clArr.indexOf(classes);

                switch (action) {
                    case 'toggle':
                        !~index ? clArr.push(classes) : delete clArr[index];
                        break;
                    case 'add':
                        !~index ? clArr.push(classes) : false;
                        break;
                    case 'remove':
                        !~index ? false : clArr.splice(index, 1);
                }

            });


            target.className = clearArray(clArr).join(' ');

        });

        return this;
    }

    DOMWork.prototype.bind = function (action, func) {
        this.elements.forEach(function (elem) {
            elem.addEventListener(action, func);
        });

        return this;

    };

    DOMWork.prototype.data = function (key, value) {
        if (typeof value === 'undefined') {
            return this.elements[0].dataset[key];
        }

        this.elements.forEach(function (elem) {
            elem.dataset[key] = value;
        });

        return this;

    };

    function clearArray(array) {
        return array.filter(function (item, index) {
            return array.indexOf(item) === index;
        });
    }

    /* istanbul ignore if */
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = DW;
        }
        exports.DW = DW;
    } else {
        window.DW = window.$DW = DW;
    }

/* istanbul ignore next */
}(window || exports);

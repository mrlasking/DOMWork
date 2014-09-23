!function (window, plugins) {

    var DOMWork = function () {
        this.elements = [];
    };

    function DW(selector, context) {

        //console.log(context);

        if (!!selector) {

            if (selector instanceof HTMLElement) {
                return new DOMWork().node(HTMLElement);
            }

            switch (selector[0]) {
                case '.':
                    return new DOMWork().byClass(selector.substr(1), context);
                case '#':
                    return new DOMWork().byId(selector.substr(1), context);
                default:
                    return new DOMWork().createByTag(selector);
            }

        }

        return new DOMWork();
    }

    DW.plugins = [];

    DOMWork.prototype.node = function (obj) {
        this.elements = [];
        this.elements.push(obj);
        return this;
    };

    DOMWork.prototype.getById = DOMWork.prototype.byId = function (id, context) {
        this.elements = [];
        this.elements.push(document.getElementById(id));
        return this;
    };

    DOMWork.prototype.getByClass = DOMWork.prototype.byClass = function (className, context) {
        this.elements = [];
        this.elements = [].slice.call(( context || document ).getElementsByClassName(className), 0);
        return this;
    };

    DOMWork.prototype.getByAttribute = DOMWork.prototype.byAttr = function (attrName, attrVal, context) {
        this.elements = [];
        this.elements = [].slice.call(( context || document ).getElementsByTagName('*'), 0)
            .reduce(function (curr, item) {
                if (item.hasAttribute(attrName)) {
                    if (!!attrVal) {
                        if (item.getAttribute(attrName) === attrVal) {
                            curr.push(item);
                        }
                    } else {
                        curr.push(item);
                    }
                }
                return curr;
            }, []);

        return this;
    };

    DOMWork.prototype.createByTag = function (tag) {
        this.elements = [];
        this.elements.push(document.createElement(tag));
        return this;
    };

    DOMWork.prototype.html = DOMWork.prototype.insHTML = function (html) {

        if (typeof html === 'undefined') {
            return this.elements[0].innerHTML;
        }

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

    DOMWork.prototype.prependTo = function (obj) {
        this.elements.forEach(function (elem) {
            obj.elements[0].insertBefore(elem, obj.elements[0].firstChild);
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

    DOMWork.prototype.attr = function (attributeName, attributeValue) {

        if (typeof attributeValue === 'undefined') {
            return this.elements[0].getAttribute(attributeName);
        }

        if (attributeValue === '') {
            this.elements.forEach(function (element) {
                element.removeAttribute(attributeName);
            });
        } else {
            this.elements.forEach(function (element) {
                element.setAttribute(attributeName, attributeValue);
            });
        }

        return this;

    };

    DOMWork.prototype.plugin = function (plugin) {
        /* istanbul ignore else */
        if (typeof plugin == 'object') {
            if (DW.plugins.indexOf(plugin.name) === -1) {
                DW.plugins.push(plugin.name)
                DOMWork.prototype[plugin.name] = plugin.func;
                if (plugin.needToRun) {
                    var d = new DOMWork();
                    d[plugin.name]();
                }
            } else {
                throw new Error('Possible plugins conflict: plugin "' + plugin.name + '" already connected');
            }
        }
    };

    DOMWork.prototype.children = function (selector) {
        if (!!selector) {
            return DW(selector, this.elements[0]);
        }

        this.elements = [].slice.call(this.elements[0].children, 0);
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

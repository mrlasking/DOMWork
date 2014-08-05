(function (e) {

    var DOMWork = function () {
        this.elements = [];
    };
    
    function DW() {
        return new DOMWork();
    }

    DOMWork.prototype.getById = function (id) {
        this.elements = [];
        this.elements.push(document.getElementById(id));
        return this;
    };
    
    DOMWork.prototype.getByClass = function (className) {
        this.elements = [];
        this.elements = document.getElementsByClassName(className);
        return this;
    };

    DOMWork.prototype.create = function (tag) {
        this.elements = [];
        this.elements.push(document.createElement(tag));
        return this;
    };

    DOMWork.prototype.insHTML = function (html) {
        [].map.call(this.elements, function(elem) {
            elem.innerHTML = html;
        });
        
        return this;
    };

    DOMWork.prototype.appendTo = function (obj) {
        [].forEach.call(this.elements, function(elem) {
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

    DOMWork.prototype.bind = function (action, func) {
        [].forEach.call(this.elements, function(elem) {
            elem.addEventListener(action, func);
        });
        return this;        
    };
    DOMWork.prototype.data = function (key, value) {       
        if (value === undefined){
            return this.elements[0].dataset[key];
        }

        [].forEach.call(this.elements, function(elem) {
            elem.dataset[key] = value;
        });    
        return this;
    };
    
    function classWork(classes, action) {
        var targets = this.elements;
        
        [].forEach.call(targets, function(target) {
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
                        !~index ? false : delete clArr[index];
                        break;
                }
            });
    
            target.className = clearArray(clArr).join(' ');
        });
        
        return this;
    }

    //Removes duplicates from array
    function clearArray(array) {
        return array.filter(function (item, index) {
            return array.indexOf(item) === index;
        });
    }
    
    

    window.DW = window.$DW = DW;

})();
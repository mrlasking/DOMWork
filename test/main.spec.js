jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('1. Main DOMWork library', function () {

    describe('1.0 Initializing', function() {
        it('1.0.1 Should have properties', function() {

            expect($DW.plugins.length).toBeGreaterThan(-1);

        });

        it('1.0.2 Should trigger an error if plugin with same name connected twice', function() {
            var dummyPlugin = {name:'pubsub', func: function() {}};
            expect(function(){$DW().plugin( dummyPlugin ); })
                .toThrow(new Error('Possible plugins conflict: plugin "' +
                    dummyPlugin.name+'" already connected'));
        });
    });

    describe('1.1 Getting by id', function () {
        var $elem;
        var elem;

        beforeEach(function () {
            loadFixtures('main.html');
            elem = $DW().byId('test');
            $elem = $('#test');
        });

        it('1.1.1 Should create one element in elements', function () {
            expect(elem.elements.length).toBe(1);
        });

        it('1.1.2 Should insert html into selected element', function () {
            elem.insHTML('Test');
            expect($elem).toContainText('Test');
        });

        it('1.1.3.1 Should append one element to another', function () {
            elem.appendTo($DW().byId('append'));
            expect($elem.parent()).toContainElement('div#test');
            expect($elem.parent().children().last().attr('id')).toBe('test')
        });

        it('1.1.3.2 Should prepend one element to another', function () {
            elem.prependTo($DW().byId('append'));
            expect($elem.parent()).toContainElement('div#test');
            expect($elem.parent().children().first().attr('id')).toBe('test')
        });

        it('1.1.4 Should add classes to element', function () {
            elem.addClass('test test2 test3');
            elem.addClass('test');
            expect($elem).toHaveClass('test');
            expect($elem).toHaveClass('test2');
            expect($elem).toHaveClass('test3');
        });

        it('1.1.5 Should remove classes from element', function () {
            elem.addClass('test test2 test3');
            elem.removeClass('test3');
            elem.removeClass('test3');
            expect($elem).not.toHaveClass('test3');
        });

        it('1.1.6 Should toggle classes in element', function () {
            elem.addClass('test test2 test3');
            elem.toggleClass('test2');
            expect($elem).not.toHaveClass('test2');
            elem.toggleClass('test2');
            expect($elem).toHaveClass('test2');
        });

        it('1.1.7 Should create a data in element\'s datset', function () {
            elem.data('test', 'test');
            expect($elem).toHaveData('test', 'test');
        });

        it('1.1.8 Should read created data in element\'s dataset', function () {
            elem.data('test', 'test');
            expect(elem.data('test')).toBe('test');
        });

        it('1.1.9 Should add an event listener to element', function () {
            var event;
            var callback = sinon.spy();

            elem.bind('click', callback);

            event = document.createEvent("HTMLEvents");
            event.initEvent("click", true, true);

            event.eventName = "click";

            elem.elements[0].dispatchEvent(event);

            expect(callback.called).toBe(true);

        });

        it('1.1.10 Should set an element as node', function () {
            var node = $DW().node($elem[0]);
            expect(node.elements.length).toBeGreaterThan(0);
            expect(typeof node.elements[0].tagName).not.toBe('undefined');
        });

        it('1.1.11 Should set element attribute', function () {
            elem.attr('test', 'test');
            expect($elem.attr('test')).toBe('test');
        });

        it('1.1.12 Should get element attribute', function () {
            elem.attr('test', 'test');
            expect(elem.attr('test')).toBe('test');
        });

        it('1.1.13 Should remove element attribute', function () {
            elem.attr('test', '');
            expect(elem.attr('test')).toBeNull();
        });

        it('1.1.14 Should return null when getting nonexistent attribute', function() {
            expect(elem.attr('nonexistent')).toBeNull();
        });

    });

    describe('1.2 Getting by class', function () {
        var $elems;
        var elems;

        beforeEach(function () {
            loadFixtures('main.html');
            elems = $DW().byClass('test');
            $elems = $('.test');
        });

        it('1.2.1 Should get elements by class', function () {
            expect(elems.elements.length).toBe(3);
        });

        it('1.2.2 Should add a class to all elements', function () {
            elems.addClass('test2');
            expect($elems).toHaveClass('test2');
        });

    });

    describe('1.3 Creating by tag', function() {
        var $elem;
        var elem;

        beforeEach(function () {
            loadFixtures('main.html');
            $elem = $('#test');
        });

        it('1.2.1 Should create element and append it', function () {
            $DW().createByTag('div').insHTML('Created').addClass('created').appendTo( $DW().byId('test') );
            expect($elem).toContainElement('div.created')
        });
    });

});
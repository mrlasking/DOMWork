jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe(' Main DOMWork library', function () {

    describe('0 Initializing', function() {
        it('0.1 Should have properties', function() {

            expect($DW.plugins.length).toBeGreaterThan(-1);

        });

        it('0.2 Should trigger an error if plugin with same name connected twice', function() {
            var dummyPlugin = {name:'pubsub', func: function() {}};
            expect(function(){$DW().plugin( dummyPlugin ); })
                .toThrow(new Error('Possible plugins conflict: plugin "' +
                    dummyPlugin.name+'" already connected'));
        });
    });

    describe('1 Getting by id', function () {
        var $elem;
        var elem;

        beforeEach(function () {
            loadFixtures('main.html');
            elem = $DW().byId('test');
            $elem = $('#test');
        });

        it('1.1 Should create one element in elements', function () {
            expect(elem.elements.length).toBe(1);
        });

        it('1.1.1 Should create one element in elements got by facade', function () {
            var elemById = $DW('#test');
            expect(elemById.elements.length).toBe(1);
        });

        it('1.2 Should insert html into selected element', function () {
            elem.insHTML('Test');
            expect($elem).toContainText('Test');
        });

        describe('1.3 Appending and prepending', function() {
            it('1.3.1 Should append one element to another', function () {
                elem.appendTo($DW().byId('append'));
                expect($elem.parent()).toContainElement('div#test');
                expect($elem.parent().children().last().attr('id')).toBe('test')
            });

            it('1.3.2 Should prepend one element to another', function () {
                elem.prependTo($DW().byId('append'));
                expect($elem.parent()).toContainElement('div#test');
                expect($elem.parent().children().first().attr('id')).toBe('test')
            });
        });
        
        describe('1.4 Working with classes', function() {

            it('1.4.1 Should add classes to element', function () {
                elem.addClass('test test2 test3');
                elem.addClass('test');
                expect($elem).toHaveClass('test');
                expect($elem).toHaveClass('test2');
                expect($elem).toHaveClass('test3');
            });

            it('1.4.2 Should remove classes from element', function () {
                elem.addClass('test test2 test3');
                elem.removeClass('test3');
                elem.removeClass('test3');
                expect($elem).not.toHaveClass('test3');
            });

            it('1.4.3 Should toggle classes in element', function () {
                elem.addClass('test test2 test3');
                elem.toggleClass('test2');
                expect($elem).not.toHaveClass('test2');
                elem.toggleClass('test2');
                expect($elem).toHaveClass('test2');
            });
        });

        describe('1.5 Working with dataset', function() {
            it('1.5.1 Should create a data in element\'s datset', function () {
                elem.data('test', 'test');
                expect($elem).toHaveData('test', 'test');
            });

            it('1.5.2 Should read created data in element\'s dataset', function () {
                elem.data('test', 'test');
                expect(elem.data('test')).toBe('test');
            });
        });

        describe('1.6 Working with attributes', function() {
            it('1.6.1 Should set element attribute', function () {
                elem.attr('test', 'test');
                expect($elem.attr('test')).toBe('test');
            });

            it('1.6.2 Should get element attribute', function () {
                elem.attr('test', 'test');
                expect(elem.attr('test')).toBe('test');
            });

            it('1.6.3 Should remove element attribute', function () {
                elem.attr('test', '');
                expect(elem.attr('test')).toBeNull();
            });

            it('1.6.4 Should return null when getting nonexistent attribute', function() {
                expect(elem.attr('nonexistent')).toBeNull();
            });
        });
        

        it('1.7 Should add an event listener to element', function () {
            var event;
            var callback = sinon.spy();

            elem.bind('click', callback);

            event = document.createEvent("HTMLEvents");
            event.initEvent("click", true, true);

            event.eventName = "click";

            elem.elements[0].dispatchEvent(event);

            expect(callback.called).toBe(true);

        });

        it('1.8 Should set a node as element', function () {
            var node = $DW().node($elem[0]);
            expect(node.elements.length).toBeGreaterThan(0);
            expect(typeof node.elements[0].tagName).not.toBe('undefined');
        });

    });

    describe('2 Getting by class', function () {
        var $elems;
        var elems;

        beforeEach(function () {
            loadFixtures('main.html');
            elems = $DW().byClass('test');
            $elems = $('.test');
        });

        it('2.1 Should get elements by class', function () {
            expect(elems.elements.length).toBe(3);
        });

        it('2.1.1 Should get elements by class via facade', function () {
            var elemByClass = $DW('.test');
            expect(elemByClass.elements.length).toBe(3);
        });

        it('2.2 Should add a class to all elements', function () {
            elems.addClass('test2');
            expect($elems).toHaveClass('test2');
        });

        /*
        TODO: write tests that proves function working on elements got by class
         */

    });

    describe('3 Creating by tag', function() {
        var $elem;
        var elem;

        beforeEach(function () {
            loadFixtures('main.html');
            $elem = $('#test');
        });

        it('3.1 Should create element and append it', function () {
            $DW().createByTag('div').insHTML('Created').addClass('created').appendTo( $DW().byId('test') );
            expect($elem).toContainElement('div.created')
        });

        it('3.2 Should create element via facade and append it', function () {
            $DW('div').html('Created').addClass('createdFromFacade').appendTo( $DW().byId('test') );
            expect($elem).toContainElement('div.createdFromFacade')
        });

    });

    describe('4 Getting real node', function() {
        var $elem;
        var elem;
        var nodeElem;

        beforeEach(function () {
            loadFixtures('main.html');
            $elem = $('#test');
        });

        it('4.1 Should get element from node', function() {
            nodeElem = document.getElementById('test');
            elem = $DW().node(nodeElem);

            expect(elem.html() === 'Some default text');

        });

        it('4.1.1 Should get element from node via facade', function() {
            nodeElem = document.getElementById('test');
            elem = $DW(nodeElem);

            expect(elem.html() === 'Some default text');

        });

    });

});
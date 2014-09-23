jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('Main DOMWork library more functionality', function () {

    var $elem;
    var elem;

    describe('Getting inner elements', function () {

        beforeEach(function () {
            loadFixtures('secondary.html');
            elem = $DW('#testChildren');
            $elem = $('#testChildren');
        });

        it('Should load all children elements', function() {
            var children = elem.children();
            var $children = $elem.children();

            expect(children.elements.length === $children.length).toBeTruthy();
        });

        it('Should load children by id', function() {
            var children = elem.children('#child');
            var $children = $elem.children('#child');

            expect(children.elements.length === $children.length).toBeTruthy();
            expect(children.html() === 'ChildWithId').toBeTruthy();
        });

        it('Should load children by class', function() {
            var children = elem.children('.child');
            var $children = $elem.children('.child');

            expect(children.elements.length === $children.length).toBeTruthy();
            expect(children.html() === 'ChildWithClass').toBeTruthy();

        });

        it('Should load elements by attribute', function() {
            var elem = $DW().byAttr('dw-test');

            expect(elem.elements.length).toBe(3);

        });

        it('Should load elements by attribute with value', function() {
            var elem = $DW().byAttr('dw-test', 'dwTest1');

            expect(elem.elements.length).toBe(1);

        });

    });

});
jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('4. Model plugin', function () {

    var $elem,
    	elem,
    	data,
    	model;

    beforeEach(function () {
        loadFixtures('main.html');
        elem = $DW().byId('testInput');
        $elem = $('#testInput');

        data = {
        	name: "test",
        	value: 1
        }

        model = $DW.Model(data);

    });

    it('4.1 Should create Model properties', function() {

		/*expect(model.name()).toBe("test");
    	expect(model.value()).toBe(1);*/

    	expect(model.name.toString()).toBe("test");
    	expect(model.value.toString()).toBe(1);

    });

    it('4.2 Should bind Model properties to functions', function() {

    	model.name.bindTo(elem);

    	expect($elem.val()).toBe(model.name.toString());

    	model.name('test2');

    	expect(model.name.toString()).toBe("test2");
		expect($elem.val()).toBe('test2');

		var e = jQuery.Event("keydown");
		e.which = 51;
		$elem.trigger(e);

        //expect(model.name.toString()).toBe('test3');

    });

});
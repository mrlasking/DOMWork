jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('2. ShowHide plugin', function () {

    var $elem;
    var elem;

    beforeEach(function () {
        loadFixtures('main.html');
        elem = $DW().byId('test');
        $elem = $('#test');
    });

    it('2.1 should hide an element', function() {
    	elem.hide();
    	expect($elem).toBeHidden();
    });

    it('2.2 should show an element', function() {
    	elem.hide();
    	elem.show();
    	expect($elem).toBeVisible();
    });

});

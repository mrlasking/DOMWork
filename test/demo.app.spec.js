jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('Demo App', function () {



    describe('1 ', function () {

        loadFixtures('demo.app.html');

        beforeEach(function () {
            elem = $DW().byId('test');
            $elem = $('#test');
        });

        $DW.app();

        it('1.1 Should fuck your mom', function () {

            expect(typeof $DW.app).toBe('function');

        });

    });
});
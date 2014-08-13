describe('4. AJAX plugin', function () {

    var server;

    afterEach(function () {
        //$DW.ajax.restore();
    });

    it("4.1 Should return promises when calling DW.ajax and it\'s aliases", function () {
        var promise1 = $DW.ajax({
            url: "http://localhost",
            data: {
                "id": 1,
                "name": "Test"
            },
            method: 'post'
        }).then(function() {
            console.log('astarta');
        }, function() {
            console.log('shit');
        });

        var promise2 = $DW.get({
            url: 'http://localhost',
            data: {
                id: 2,
                name: "test"
            }
        });

        var promise3 = $DW.post({
            url: 'http://localhost',
            data: {
                id: 2,
                name: "test"
            }
        });

        expect(promise1 instanceof Promise).toBe(true);
        expect(promise2 instanceof Promise).toBe(true);
        expect(promise3 instanceof Promise).toBe(true);

    });

});
jasmine.getFixtures().fixturesPath = 'test/fixtures';

describe('PubSub plugin', function () {

    var $elem;
    var elem;

    beforeEach(function () {
        loadFixtures('main.html');
        elem = $DW().byId('test');
        $elem = $('#test');
    });

    it('1 Should subscribe to topic', function() {
    	var callback = sinon.spy();
    	var subscription = $DW.pubsub.subscribe('test/test1', callback);

    	expect(subscription).toBe(1);

    });

    it('2 Should execute a function by publishing topic', function() {

    	var callback = sinon.spy();

    	var subscription = $DW.pubsub.subscribe('test/test2', function(obj) {
    		obj.f();
    	});

    	expect(subscription).toBe(2);

    	expect(callback.called).toBe(false);

    	$DW.pubsub.publish('test/test2', {f: callback});

    	expect(callback.called).toBe(true);

    });

    it('3 Should unsubscribe from topic', function() {

    	var callback = sinon.spy();

    	var subscription = $DW.pubsub.subscribe('test/test3', function(obj) {
    		obj.f();
    	});

    	expect(subscription).toBe(3);
    	expect(callback.called).toBe(false);

    	$DW.pubsub.publish('test/test3', {f: callback});

    	expect(callback.called).toBe(true);

    	$DW.pubsub.unsubscribe(subscription);

    	$DW.pubsub.publish('test/test3', {f: callback});

    	expect(callback.calledOnce).toBe(true);

    });

    it('4 Should return false when publishing a topic without subscribers', function() {

    	var answer = $DW.pubsub.publish('test/test4', {value: 1});
    	expect(answer).toBe(false);
    });

});
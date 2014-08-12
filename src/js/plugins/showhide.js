!function(dw) {

	dw().plugin({
		name: 'hide',
		func: function() {
			this.elements.forEach(function(elem) {
				elem.style.display = 'none';
			});
		}
	});

	dw().plugin({
		name: 'show',
		func: function() {
			this.elements.forEach(function(elem) {
				elem.style.display = '';
			});
		}
	});

}(window.$DW);
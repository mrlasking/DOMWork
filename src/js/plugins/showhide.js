!function(dw) {

	dw().plugin({
		name: 'hide',
		func: function() {
			this.elements.forEach(function(elem) {
				elem.style.display = 'none';
			});
			return this;
		}
	});

	dw().plugin({
		name: 'show',
		func: function() {
			this.elements.forEach(function(elem) {
				elem.style.display = '';
			});
			return this;
		}
	});

}(window.$DW);
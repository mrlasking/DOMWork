!function(dw) {

	dw().plugin({
		name: "model",
		func: function() {

			var model = function() {

				return function( data ) {

					var properties = {};
					var m = data;

					var result = {};

					for (var n in data) {
						result[n] = modelValue(data, n);
					}

					function modelValue(data, n) {

						var bindedTo = [];

						return (function(data, n) {

							var f = function(value) {

								if (typeof value !== 'undefined') {

									if (value !== f.toString()) {

										for (var i in bindedTo) {
											if (bindedTo[i].nodeName === 'INPUT') {
												bindedTo[i].value = value;
											} 
											if (bindedTo[i].nodeName === 'TEXTAREA') {
												bindedTo[i].value = value;
											}
											if (bindedTo[i].nodeName === 'DIV') {
												bindedTo[i].innerText = value;
											}
										}

										f.toString = function() {
											return value;
										}
									}

									
								}
								
								return f.toString();
							}

							f.toString = function() {
								return data[n];
							}

							f.bindTo = function( dwnodes ) {

								dwnodes.elements.forEach(function(item) {
									if (item.nodeName === 'INPUT') {
										item.value = f.toString();
										bindedTo.push(item);

										!function(item) {
											dw().node(item).bind('keydown', function() {
												setTimeout(function() {
													f.toString = function() {
														return item.value;
													}
													
													for (var i in bindedTo) {
														if (item != bindedTo[i])
															if (bindedTo[i].nodeName === 'INPUT') {
																bindedTo[i].value = item.value;
															} 
															if (bindedTo[i].nodeName === 'TEXTAREA') {
																bindedTo[i].value = item.value;
															}
															if (bindedTo[i].nodeName === 'DIV') {
																bindedTo[i].innerText = item.value;
															}
													}

												}, 0);
											});
										}(item);

									} 
									if (item.nodeName === 'DIV') {
										item.innerText = f.toString();
										bindedTo.push(item);
									}
									if (item.nodeName === 'TEXTAREA') {
										item.value = f.toString();
										bindedTo.push(item);

										!function(item) {
											dw().node(item).bind('keydown', function() {
												setTimeout(function() {
													f.toString = function() {
														return item.value;
													}
													
													if (item != bindedTo[i])
														for (var i in bindedTo) {
															if (bindedTo[i].nodeName === 'INPUT') {
																bindedTo[i].value = item.value;
															} 
															if (bindedTo[i].nodeName === 'TEXTAREA') {
																bindedTo[i].value = item.value;
															}
															if (bindedTo[i].nodeName === 'DIV') {
																bindedTo[i].innerText = item.value;
															}
														}

												}, 0);
											});
										}(item);

									} 
								});

							}

							properties[data[n]] = f;

							return f;
							
						})(data, n);
					}

					return result;

				}

			}

			dw.Model = dw.Model || new model();

			return "Use it from $DW directly: $DW.Model()";

		},

		needToRun: true
	});

}($DW);
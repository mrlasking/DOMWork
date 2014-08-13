!function(dw) {

    /*istanbul ignore else*/
    if (typeof Promise === 'undefined') {
        window.Promise = RSVP.Promise;
    }

    dw().plugin({
        name: "ajax",
        func: function() {

            var ajax = function(options, method) {

                var reqString = '';
                for (var d in options.data) {
                    reqString += d + '=' + options.data[d].toString();
                }

                return new Promise(function(resolve, reject) {
                    var req = new XMLHttpRequest();
                    var method = method || 'GET';

                    if (options.method && options.method.toUpperCase() === 'POST' ) {
                        method = "POST";
                    }

                    var url = options.url + ((method == 'GET') ? "?"+reqString : "" );

                    req.open(method, url);

                    /*istanbul ignore next*/
                    req.onload = function() {
                        if (req.status == 200) {
                            resolve(req.response);
                        }
                        else {
                            reject(Error(req.statusText));
                        }
                    };

                    /*istanbul ignore next*/
                    req.onerror = function() {
                        reject(Error("Network Error"));
                    };

                    if (method === "POST") {
                        req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    }

                    req.send( reqString );

                });

            };

            dw.ajax = dw.ajax || ajax;
            dw.get = dw.get || function(options) {
                return ajax(options, 'GET');
            };
            dw.post = dw.post || function(options) {
                return ajax(options, 'POST');
            };

            return "Use it from $DW directly: $DW.ajax, $DW.get, $DW.post"

        },

        needToRun: true
    });

}($DW);
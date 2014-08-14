!function($DW) {

    function start() {

        this.required = [
            "ajax",
            "handlebars",
            "pubsub",
        ];


        var notLoadedPlugins = [];
        for (var i = 0, l = this.required.length; i<l; i++) {
            if (!~$DW.plugins.indexOf(this.required[i])) {
                notLoadedPlugins.push(this.required[i]);
            }
        }

        if (!!notLoadedPlugins.length) {
            throw new Error('Application needs to load' + JSON.stringify(notLoadedPlugins) + ' plugins for correct work.');
        }

        var KEYCODE_ENTER = 13;

        var widgets = {};

        var lss = new localStorageService();

        //Compiling handlebars template
        var source = $DW().byId('test-template').elements[0].innerHTML;
        //template here is a function that accepts data object
        var greetingTemplate = $DW.Handlebars.compile(source);

        source = $DW().byId('task-template').elements[0].innerHTML;
        var taskTemplate = $DW.Handlebars.compile(source);

        source = $DW().byId('ajax-template').elements[0].innerHTML;
        var ajaxTemplate = $DW.Handlebars.compile(source);

        function ajaxDataWidget() {

            var req = $DW.get({
                url: 'http://localhost:3000/test',
                data: {
                    test: 'test-get',
                    id: 1
                }
            });

            req.then(function (data) {
                return JSON.parse(data);
            }).then(function (data) { //Using then chaining
                $DW.pubsub.publish('app/ajaxGetTest', data);
            }, function (err) { //Second parameter in then is a function that executes on error

                console.log(err);
                console.log('GET: Maybe you are watching this page from github - it have not backend server.\nFalling back to data.json file loading');

                fallbackRequest('get').then(function (data) {
                    $DW.pubsub.publish('app/ajaxGetTest', data);
                });

            });

            //And another way of calling:
            $DW.post({
                url: 'http://localhost:3000/testPost',
                data: {
                    test: 'test-post',
                    id: 2
                },
                method: 'POST'
            }).then(function (data) {
                $DW.pubsub.publish('app/ajaxPostTest', data);
            }, function (err) {

                console.log(err);
                console.log('POST: Maybe you are watching this page from github - it have not backend server.\nFalling back to data.json file loading');

                fallbackRequest('post').then(function (data) {
                    $DW.pubsub.publish('app/ajaxPostTest', data);
                });
            });

            function fallbackRequest(method) {
                return $DW[method]({
                    url: '/data.json',
                    data: {
                        test: 'test-get',
                        id: 1
                    }
                });
            }

            this.name = 'ajaxData';
            this.start = function () {
                $DW.pubsub.subscribe('app/ajaxGetTest', function (data) {

                    processResponse(data, 'get');

                });

                $DW.pubsub.subscribe('app/ajaxPostTest', function (data) {

                    processResponse(data, 'post');

                });

                function processResponse(data, method) {

                    method = method || 'get';

                    if (typeof data !== 'object') {
                        data = JSON.parse(data);
                    }

                    var layout = '';

                    for (var j = 0; j < data.length; j++) {
                        layout += ajaxTemplate(data[j]);
                    }

                    $DW().byId('ajax-' + method + '-result').insHTML(layout);
                }
            }
        }


        function nameInputWidget() {

            this.name = "nameInput";

            this.start = function () {

                //We are getting saved in localstorage name
                var name = lss.get('name') || '';

                //Place name in our name input directly
                $DW().byId('nm').elements[0].value = name;

                //Publish an app/greetind topic
                $DW.pubsub.publish('app/greeting', {name: name});

                $DW().byId('nm').bind('keydown', function () {

                    //For correct immidiate keydown work we need a hack with timeout 0
                    setTimeout(function () {
                        var name = $DW().byId('nm').elements[0].value;

                        $DW.pubsub.publish('app/greeting', {name: name});

                        //Save name to localstorage
                        $DW.pubsub.publish('localstorage/save', {
                            name: "name",
                            data: name
                        });

                    }, 0);

                });
            };
        }

        function nameDisplayWidget() {

            this.name = "nameDisplay";

            this.start = function () {
                $DW.pubsub.subscribe('app/greeting', function (data) {
                    if (data.name !== '') {

                        //inserting Handlebars template
                        data = { name: data.name };
                        $DW().byId('content').insHTML(greetingTemplate(data));

                    }
                });
            };
        }

        function taskInputWidget() {

            this.name = "taskInput";

            this.start = function () {
                $DW().byId('todoTaskInput').bind('keypress', function (event) {

                    if (event.keyCode === KEYCODE_ENTER) {
                        var task = $DW().node(this).elements[0].value;
                        $DW().node(this).elements[0].value = '';
                        $DW.pubsub.publish('app/addTask', {task: task});
                    }

                });
            };
        }

        function tasksDisplayWidget() {

            this.name = "taskDisplay";

            var tasks = lss.get('tasks') || [];

            this.start = function () {

                countTasks()
                showTasks();

                $DW.pubsub.subscribe('app/addTask', function (data) {
                    addTask(data);
                    saveTasks();
                });

                $DW.pubsub.subscribe('app/deleteTask', function (data) {
                    tasks.splice(data.id, 1);
                    countTasks();
                    showTasks();
                    saveTasks();
                });

                $DW.pubsub.subscribe('app/greeting', function (data) {
                    if (data.name !== '') {
                        $DW().byId('tasksOwner').insHTML(data.name + "'s ");
                    }
                });

                /*
                 I'm using javascript event bubbling to bind it to #todoTask's
                 children that have 'delete' class
                 */
                $DW().byId('todoTasks').bind('click', function (event) {

                    if (event.target.className === 'delete') {
                        var id = $DW().node(event.target).attr('data-id');
                        $DW.pubsub.publish('app/deleteTask', {id: id});
                    }

                });

            };

            function addTask(data) {
                tasks.push(data.task);
                showTasks();
                countTasks();
            }

            function countTasks() {
                $DW.pubsub.publish('app/countTask', {total: tasks.length});
            }

            function showTasks() {
                var layout = "";

                for (var i = 0; i < tasks.length; i++) {
                    //We are loading new data in taskTemplate and adding resulting HTML to layout variable
                    var data = { task: tasks[i], id: i, num: i + 1 };
                    layout += taskTemplate(data);
                }

                $DW().byId('todoTasks').insHTML(layout);

            }

            function saveTasks() {
                $DW.pubsub.publish('localstorage/save', {
                    name: 'tasks',
                    data: tasks
                });
            }

        }

        function tasksTotalWidget() {
            this.name = "tasksTotal";

            this.start = function () {
                /*
                 This widget only subscribes on app/countTask topic to show it's amount
                 The power of pubsub is that we can delete this talksTotalWidget and nothing will be broken.
                 */
                $DW.pubsub.subscribe('app/countTask', function (data) {
                    $DW().byId('todoTasksTotal').insHTML('Total: ' + data.total);
                });
            }

        }

        function localStorageService() {

            this.get = function (name) {
                return JSON.parse(localStorage.getItem(name));
            }

            $DW.pubsub.subscribe('localstorage/save', function (data) {
                localStorage.setItem(data.name, JSON.stringify(data.data));
            });
        }

        var tiw = new taskInputWidget();
        var tdw = new tasksDisplayWidget();
        var ttw = new tasksTotalWidget();

        var ndw = new nameDisplayWidget();
        var niw = new nameInputWidget();

        var adw = new ajaxDataWidget();

        /*
         We need to load widgets in a right order.

         Remember simple rule: if widget have a subscribe in constructor or start function,
         it goes before widgets that publishes that topic in constructor or start function.

         If widgets publishing or subscribing topics in events, the order isn't important.

         In ideal world it will be a DOMWork plugin doing it.
         */

        widgets[ttw.name] = ttw;
        widgets[tiw.name] = tiw;
        widgets[tdw.name] = tdw;

        widgets[ndw.name] = ndw;
        widgets[niw.name] = niw;

        widgets[adw.name] = adw;

        for (var widget in widgets) {
            widgets[widget].start();
        }

    }

    $DW.app = start;
}($DW);
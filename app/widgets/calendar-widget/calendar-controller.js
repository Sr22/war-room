//ANGULAR CONTROLLER AND CALLED FUNCTIONS

angular.module('warRoom')

    .controller('calendarControl', ['$scope', '$interval', function($scope, $interval){
        var a;

        //mtdNg
        $scope.mtdNg = function() {return mtd($scope.yearA, $scope.monthA.val);};

        //Sets up initial values
        {
            $scope.months = [
                {name:'January', val:0},
                {name:'February', val:1},
                {name:'March', val:2},
                {name:'April', val:3},
                {name:'May', val:4},
                {name:'June', val:5},
                {name:'July', val:6},
                {name:'August', val:7},
                {name:'September', val:8},
                {name:'October', val:9},
                {name:'November', val:10},
                {name:'December', val:11}
            ];
            $scope.yearA = new Date().getFullYear();
            $scope.monthA = $scope.months[new Date().getMonth()];
            $scope.dateA = new Date().getDate();
            $scope.boxHide = false;

            $scope.createHide = true;
            $scope.createTitle = '';
            $scope.createTime = 0;
            $scope.createDesc = '';
            $scope.createRepeat = 'X';
            $scope.createRepeatInf ='Iteration of event: None';
            $scope.createColor = '#e6e6e6';
            $scope.defCon = 0;
            $scope.star = 'star_border';

            $scope.deleteHide = true;
            $scope.deleteTHide = true;
            $scope.deleteEvents = [];
            $scope.deleteCheck = [];
            $scope.deleteColor = '#e6e6e6';
            $scope.deleteConBoxHide = true;

            $scope.events = [];
            $scope.data = {};
        }

        //Generates calendar and calendar days
        $scope.calendar = function(){
            if (document.getElementById('calendarNgWidget').offsetHeight > 528) {
                var c = new Date($scope.yearA, $scope.monthA.val, 1);//Sets calendar to current month and year
                dt = 1; //First day of the month - variable deals with the actual date displayed in the button!
                var gen = '<tr id="des" style="font-size: 12px; text-align: center;"> ' +
                    '<td class="itemBox" id="sun"><strong>Sun</strong></td> ' +
                    '<td class="itemBox" id="mon"><strong>Mon</strong></td> ' +
                    '<td class="itemBox" id="tue"><strong>Tue</strong></td> ' +
                    '<td class="itemBox" id="wed"><strong>Wed</strong></td> ' +
                    '<td class="itemBox" id="thu"><strong>Thu</strong></td> ' +
                    '<td class="itemBox" id="fri"><strong>Fri</strong></td> ' +
                    '<td class="itemBox" id="sat"><strong>Sat</strong></td> ' +
                    '</tr>';
                gen += calendarFirWeek(c.getDay());
                for (a = 0; a < 3; a++) {
                    gen += calendarNrmWeek();
                }
                for (a = 0; a < 2; a++) {
                    gen += calendarFinWeek(c.getFullYear(), c.getMonth());
                }
                gen += '</tr>';
                if (new Date().getFullYear() == $scope.yearA && new Date().getMonth() == $scope.monthA.val) { //Highlights today
                    gen = gen.replace(realDay(new Date().getDate()), toDay(new Date().getDate()));
                }
                gen = gen.replace(inactiveCont($scope.dateA), activeCont($scope.dateA)); //Highlights active date
                return gen;
            }
            else {
                return ''
            }
        };

        //Snap back to current date function
        $scope.reset = function(){
            $scope.yearA = new Date().getFullYear();
            $scope.monthA = $scope.months[new Date().getMonth()];
            $scope.dateA = new Date().getDate();
        };

        //Set date to first date on month switch function
        $scope.setToFirst = function() {
            $scope.dateA = 1;
        };

        //Active date highlighting function
        $scope.activeHighlight = function (num) {
            $scope.dateA = num;
        };

        //Display box dynamic height function
        $scope.boxHeight = function () {
            var h = document.getElementById('calendarNgWidget').offsetHeight - 411;
            if (h <= 0) {h = 123;}
            return 'height: ' + h + 'px;';
        };

        //Display create box dynamic height function
        $scope.createHeight = function () {
            var h = document.getElementById('calendarNgWidget').offsetHeight - 411;
            if (h <= 0) {h = 123;}
            return 'height: ' + h + 'px; background: ' + $scope.createColor + ';';
        };

        //Initialization for chrome.storage.sync
        chrome.storage.sync.get('events', function (data) {
            error();
            if (data.events == null){
                chrome.storage.sync.set({'events': []}, function(){
                    error();
                    chrome.storage.sync.get('events', function (data) { //Test stuff. Delete later
                        error();
                        $scope.events = data.events;
                        $scope.data = data;
                    });
                    chrome.storage.sync.getBytesInUse(null, function (data) {
                        console.info(data + ' bytes in use');
                    });
                });
            } else {
                chrome.storage.sync.get(null, function (data) { //Test stuff. Delete later
                    error();
                    $scope.events = data.events;
                    $scope.data = data;
                });
                chrome.storage.sync.getBytesInUse(null, function (data) {
                    console.info(data + ' bytes in use');
                });
            }
        });

        //Initialize creating a calendar event
        $scope.startCreate = function () {
            $scope.boxHide = true;
            $scope.createHide = false;
        };

        //Cancel create button
        $scope.cancelCreate = function () {
            $scope.createTitle = '';
            $scope.createTime = 0;
            $scope.createDesc = '';
            $scope.defCon = 0;
            $scope.star = 'star_border';
            $scope.createRepeat = 'X';
            $scope.createRepeatInf = 'Iteration of event: None';
            $scope.createColor = '#e6e6e6';
            $scope.boxHide = false;
            $scope.createHide = true;
        };

        //Repeat of event button
        $scope.createRepeatChange = function () {
            a = $scope.createRepeat;
            if (a == 'X') {
                $scope.createRepeat = 'D';
                $scope.createRepeatInf = 'Iteration of event: Daily';
            }
            if (a == 'D') {
                $scope.createRepeat = 'W';
                $scope.createRepeatInf = 'Iteration of event: Weekly';
            }
            if (a == 'W') {
                $scope.createRepeat = 'M';
                $scope.createRepeatInf = 'Iteration of event: Monthly';
            }
            if (a == 'M') {
                $scope.createRepeat = 'Y';
                $scope.createRepeatInf = 'Iteration of event: Yearly';
            }
            if (a == 'Y') {
                $scope.createRepeat = 'X';
                $scope.createRepeatInf = 'Iteration of event: None';
            }
        };

        //DEFCON of event button
        $scope.defConChange = function () {
            a = $scope.star;
            if (a == 'star_border') {
                $scope.defCon = 1;
                $scope.star = 'star_half';
            }
            if (a == 'star_half') {
                $scope.defCon = 2;
                $scope.star = 'star';
            }
            if (a == 'star') {
                $scope.defCon = 0;
                $scope.star = 'star_border';
            }
        };

        //Confirm create event button
        $scope.confirmCreate = function () {
            var t = '....';
            if ($scope.createTime) { //Creates time value
                t = '';
                if ($scope.createTime.getHours() < 10) {
                    t += '0' + $scope.createTime.getHours();
                } else {
                    t += $scope.createTime.getHours();
                }
                if ($scope.createTime.getMinutes() < 10) {
                    t += '0' + $scope.createTime.getMinutes();
                } else {
                    t += $scope.createTime.getMinutes();
                }
            }
            if ($scope.createTitle == '') { //Ensures that required fields are filled (Title)
                $scope.createColor = '#ffcccc';
                var f = function() {$scope.createColor = '#e6e6e6';};
                $interval(f, 100, 1);
            } else {
                var day = new Date($scope.yearA, $scope.monthA.val, $scope.dateA).getDay();
                $scope.events.push('ev' + new Date().getTime());
                chrome.storage.sync.get('events', function (data) {
                    error();
                    chrome.storage.sync.set({'events': $scope.events}, function (data) {
                        error();
                    });
                });
                var event = {};
                event[$scope.events[$scope.events.length - 1]] = [$scope.createTitle,
                    $scope.createDesc,
                    $scope.yearA + ' ' + $scope.monthA.val + ' ' +
                    $scope.dateA + ' ' + day + ' ' +
                    $scope.createRepeat + ' ' + $scope.defCon + ' ' + t
                ];
                $scope.data[$scope.events[$scope.events.length - 1]] = [$scope.createTitle,
                    $scope.createDesc,
                    $scope.yearA + ' ' + $scope.monthA.val + ' ' +
                    $scope.dateA + ' ' + day + ' ' +
                    $scope.createRepeat + ' ' + $scope.defCon + ' ' + t
                ];
                chrome.storage.sync.set(event, function () {
                    error();
                    chrome.storage.sync.get(null, function (data) { //Test stuff. Delete later
                        error();
                        $scope.data = data;
                    });
                });
                $scope.createTitle = '';
                $scope.createTime = 0;
                $scope.createDesc = '';
                $scope.defCon = 0;
                $scope.star = 'star_border';
                $scope.createRepeat = 'X';
                $scope.createRepeatInf = 'Iteration of event: None';
                $scope.createColor = '#e6e6e6';
                $scope.boxHide = false;
                $scope.createHide = true;
            }
        };

        //Read and display calendar data
        $scope.calendarRead = function () {
            if ($scope.boxHide == false) {
                var gen = '';
                var sort = [];
                var day = new Date($scope.yearA, $scope.monthA.val, $scope.dateA).getDay();
                if ($scope.events.length > 0){
                    for (a = 0; a < $scope.events.length; a++) {
                        var ev = $scope.events[a];
                        var date = $scope.data[ev][2].split(' ');
                        if (date[4] == 'X' && date[0] == $scope.yearA &&
                            date[1] == $scope.monthA.val && date[2] == $scope.dateA){
                            gen += eventContainer($scope.data[ev][0], $scope.data[ev][1], date[5], date[6]);
                        }
                        if (date[4] == 'D'){
                            gen += eventContainer($scope.data[ev][0], $scope.data[ev][1], date[5], date[6]);
                        }
                        if (date[4] == 'W' && date[3] == day){
                            gen += eventContainer($scope.data[ev][0], $scope.data[ev][1], date[5], date[6]);
                        }
                        if (date[4] == 'M' && date[2] == $scope.dateA){
                            gen += eventContainer($scope.data[ev][0], $scope.data[ev][1], date[5], date[6]);
                        }
                        if (date[4] == 'Y' && date[1] == $scope.monthA.val && date[2] == $scope.dateA){
                            gen += eventContainer($scope.data[ev][0], $scope.data[ev][1], date[5], date[6]);
                        }
                        if (gen != ''){
                            sort.push(gen);
                            gen = '';
                        }
                    }
                    sort.sort();
                    gen = sort.join('');
                }
                return gen;
            }
        };

        //Initialize deleting a calendar event
        $scope.startDelete = function() {
            $scope.deleteEvents= [];
            $scope.deleteCheck = [];
            $scope.boxHide = true;
            $scope.deleteHide = false;
            $scope.deleteTHide = false;
        };

        //Display delete box dynamic height function
        $scope.deleteHeight = function () {
            var h = document.getElementById('calendarNgWidget').offsetHeight - 411;
            if (h <= 0) {h = 123;}
            return 'height: ' + h + 'px; background: ' + $scope.deleteColor + ';';
        };
        
        //Read and display delete list
        {/*$scope.deleteRead = function () {
            if ($scope.deleteHide == false) {
                var gen = '';
                var sort = [];
                var day = new Date($scope.yearA, $scope.monthA.val, $scope.dateA).getDay();
                if ($scope.events.length > 0){
                    var b = 0;
                    for (a = 0; a < $scope.events.length; a++) {
                        var ev = $scope.events[a];
                        var date = $scope.data[ev][2].split(' ');
                        if (date[4] == 'X' && date[0] == $scope.yearA &&
                            date[1] == $scope.monthA.val && date[2] == $scope.dateA){
                            deletePush($scope.deleteEvents, $scope.deleteCheck, ev);
                            gen += deleteContainer($scope.data[ev][0], date[5], date[6], ev, b);
                            b++;
                        }
                        if (date[4] == 'D'){
                            deletePush($scope.deleteEvents, $scope.deleteCheck, ev);
                            gen += deleteContainer($scope.data[ev][0], date[5], date[6], ev, b);
                            b++;
                        }
                        if (date[4] == 'W' && date[3] == day){
                            deletePush($scope.deleteEvents, $scope.deleteCheck, ev);
                            gen += deleteContainer($scope.data[ev][0], date[5], date[6], ev, b);
                            b++;
                        }
                        if (date[4] == 'M' && date[2] == $scope.dateA){
                            deletePush($scope.deleteEvents, $scope.deleteCheck, ev);
                            gen += deleteContainer($scope.data[ev][0], date[5], date[6], ev, b);
                            b++;
                        }
                        if (date[4] == 'Y' && date[1] == $scope.monthA.val && date[2] == $scope.dateA){
                            deletePush($scope.deleteEvents, $scope.deleteCheck, ev);
                            gen += deleteContainer($scope.data[ev][0], date[5], date[6], ev, b);
                            b++;
                        }
                        if (gen != ''){
                            sort.push(gen);
                            gen = '';
                        }
                        console.log('Checking: ' + ev);
                    }
                    sort.sort();
                    gen = sort.join('');
                }
                console.log('Generated: ' + gen);
                console.log('DE:' + $scope.deleteEvents);
                console.log('DC:' + $scope.deleteCheck);
                return gen;
            }
        };*/}
        $scope.deleteRead = function () {
            if ($scope.deleteHide == false) {
                var gen = '';
                var sort = [];
                if ($scope.events.length > 0){
                    var b = 0;
                    for (a = 0; a < $scope.events.length; a++) {
                        var ev = $scope.events[a];
                        var date = $scope.data[ev][2].split(' ');
                            deletePush($scope.deleteEvents, $scope.deleteCheck, ev);
                            gen += deleteContainer($scope.data[ev][0], date[5], date[6], ev, b);
                            b++;
                            sort.push(gen);
                            gen = '';
                        }
                    sort.sort();
                    gen = sort.join('');
                }
                return gen;
            }
        };

        //Cancel delete button
        $scope.cancelDelete = function () {
            $scope.deleteEvents= [];
            $scope.deleteCheck = [];
            $scope.deleteHide = true;
            $scope.deleteTHide = true;
            $scope.boxHide = false;
        };

        //Update hit list function
        $scope.hitListUpdate = function (id, num) {
            var index = $scope.deleteEvents.indexOf('*' + id);
            if ($scope.deleteEvents[num] == '*' + id) {
                $scope.deleteEvents[num] = id;
                $scope.deleteCheck[num] = 'check_circle';
                return;
            }
            if ($scope.deleteEvents[num] == id) {
                $scope.deleteEvents[num] = '*' + id;
                $scope.deleteCheck[num] = 'radio_button_unchecked';
                return;
            }
        };

        //Confirm the kill events
        $scope.confirmDelete = function () {
            var count = 0;
            for (a = 0; a < $scope.deleteEvents.length; a++){
                if ($scope.deleteEvents[a].includes('*')) {
                    count++;
                }
            }
            if ($scope.deleteEvents.length == count) { //Ensures that something is being deleted
                $scope.deleteColor = '#ffcccc';
                var f = function() {$scope.deleteColor = '#e6e6e6';};
                $interval(f, 100, 1);
            } else if ($scope.deleteEvents.length != count) {
                $scope.deleteTHide = true;
                $scope.deleteConBoxHide = false;
            }
        };

        //Cancel the kill events
        $scope.cancelDeleteKill = function () {
            $scope.deleteTHide = false;
            $scope.deleteConBoxHide = true;
        };

        //Carry out the kill events
        $scope.confirmDeleteKill = function () {
            var deleteArr = [];
            for (a = 0; a < $scope.deleteEvents.length; a++) {
                var index = $scope.events.indexOf($scope.deleteEvents[a]);
                if (index > -1) {
                    $scope.events.splice(index, 1);
                    delete $scope.data[$scope.deleteEvents[a]];
                    deleteArr.push($scope.deleteEvents[a]);
                }
            }
            chrome.storage.sync.set({events: $scope.events});
            chrome.storage.sync.remove(deleteArr);
            $scope.deleteEvents= [];
            $scope.deleteCheck = [];
            $scope.deleteHide = true;
            $scope.deleteTHide = true;
            $scope.deleteConBoxHide = true;
            $scope.boxHide = false;
        }

    }]);
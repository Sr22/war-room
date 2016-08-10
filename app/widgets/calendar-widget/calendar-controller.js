//CALENDAR ANGULAR CONTROLLER

angular.module('warRoom')

    .controller('calendarControl', ['$scope', '$interval', function($scope, $interval){
        var a;

        //Sets up initial values
        {
            //Main init values
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
                $scope.badHide = true;
            }

            //Create init values
            {
                $scope.createHide = true;
                $scope.createTitle = '';
                $scope.createTime = 0;
                $scope.createDesc = '';
                $scope.createRepeat = 'X';
                $scope.createRepeatInf ='Iteration of event: None';
                $scope.defCon = 0;
                $scope.star = 'star_border';
            }

            //Delete init values
            {
                $scope.deleteHide = true;
                $scope.deleteTHide = true;
                $scope.deleteEvents = [];
                $scope.deleteCheck = [];
                $scope.deleteConBoxHide = true;
            }

            //Edit init values
            {
                $scope.editHide = true;
                $scope.editing = false;
                $scope.editingEV = '';
            }

            //Customization init values
            {
                $scope.customHide = true;
                //BarBck, BarTxt, BoxBck, BoxTxt, CalBck, CalTxt, ToBck, ToTx, Df0, Df1, Df2, DfTxt, Background
                $scope.themeCurrent = ['#000000;', '#ffffff;', '#e6e6e6', '#000000','#cccccc','#000000',
                    '#000000', '#ffffff', '#66ccff', '#ff9966', '#ff6666', '#ffffff', '#ffffff', '#000000'];
                $scope.themes = [{name: 'Original', id: 0}, {name: 'Bootstrap', id: 1}, {name: 'Nocturnal', id: 2},
                    {name: 'CDK Global', id: 3}, {name: 'Atlassian', id: 4}, {name: 'Revolutionary', id: 5},
                    {name: 'Psychedelic', id: 6}];
                $scope.themeA = $scope.themes[0];
            }

            //Chrome sync init values
            $scope.events = null;
            $scope.data = null;
        }

        //Main Process
        {
            //mtdNg
            $scope.mtdNg = function() {return mtd($scope.yearA, $scope.monthA.val);};

            //Generates calendar and calendar days
            $scope.calendar = function(){
                if (document.getElementById('calendarNgWidget').offsetHeight > 528) {
                    var c = new Date($scope.yearA, $scope.monthA.val, 1);//Sets calendar to current month and year
                    dt = 1; //First day of the month - variable deals with the actual date displayed in the button!
                    var gen = '<tr id="des" style="font-size: 12px; text-align: center;"> ' +
                        '<td class="itemBox" id="sun" style="{{calBckTheme()}}"><strong>Sun</strong></td> ' +
                        '<td class="itemBox" id="mon" style="{{calBckTheme()}}"><strong>Mon</strong></td> ' +
                        '<td class="itemBox" id="tue" style="{{calBckTheme()}}"><strong>Tue</strong></td> ' +
                        '<td class="itemBox" id="wed" style="{{calBckTheme()}}"><strong>Wed</strong></td> ' +
                        '<td class="itemBox" id="thu" style="{{calBckTheme()}}"><strong>Thu</strong></td> ' +
                        '<td class="itemBox" id="fri" style="{{calBckTheme()}}"><strong>Fri</strong></td> ' +
                        '<td class="itemBox" id="sat" style="{{calBckTheme()}}"><strong>Sat</strong></td> ' +
                        '</tr>';
                    gen += calendarFirWeek(c.getDay());
                    for (a = 0; a < 3; a++) {
                        gen += calendarNrmWeek();
                    }
                    for (a = 0; a < 2; a++) {
                        gen += calendarFinWeek(c.getFullYear(), c.getMonth());
                    }
                    gen += '</tr>';
                    for (a = 1; a < $scope.mtdNg()+1; a++) {
                        var day = new Date($scope.yearA, $scope.monthA.val, a).getDay();
                        if ($scope.events != null) {
                            var sort = [];
                            var b;
                            for (b = 0; b < $scope.events.length; b++) {
                                var ev = $scope.events[b];
                                var date = $scope.data[ev][2].split(' ');
                                if (date[4] == 'X' && date[0] == $scope.yearA &&
                                    date[1] == $scope.monthA.val && date[2] == a) {sort.push(date[5]);}
                                if (date[4] == 'D') {sort.push(date[5]);}
                                if (date[4] == 'W' && date[3] == day) {sort.push(date[5]);}
                                if (date[4] == 'M' && date[2] == a) {sort.push(date[5]);}
                                if (date[4] == 'Y' && date[1] == $scope.monthA.val && date[2] == a) {sort.push(date[5]);}
                            }
                            sort.sort();

                            if (sort.length > 0 && !(new Date().getFullYear() == $scope.yearA &&
                                new Date().getMonth() == $scope.monthA.val && new Date().getDate() == a)) {
                                if (sort[sort.length-1] == '0') {
                                    gen = gen.replace(realDay(a), df0Day(a));
                                }
                                if (sort[sort.length-1] == '1') {
                                    gen = gen.replace(realDay(a), df1Day(a));
                                }
                                if (sort[sort.length-1] == '2') {
                                    gen = gen.replace(realDay(a), df2Day(a));
                                }
                            }
                        }
                    }
                    if (new Date().getFullYear() == $scope.yearA && new Date().getMonth() == $scope.monthA.val) { //Highlights today
                        gen = gen.replace(realDay(new Date().getDate()), toDay(new Date().getDate()));
                    }
                    if (gen.indexOf(inactiveCont($scope.dateA)) > -1) { //Highlights active date
                        gen = gen.replace(inactiveCont($scope.dateA), activeCont($scope.dateA));
                    } else if (gen.indexOf(todayCont($scope.dateA)) > -1) {
                        gen = gen.replace(todayCont($scope.dateA), activeCont($scope.dateA));
                    } else if (gen.indexOf(df0Cont($scope.dateA)) > -1) {
                        gen = gen.replace(df0Cont($scope.dateA), activeCont($scope.dateA));
                    } else if (gen.indexOf(df1Cont($scope.dateA)) > -1) {
                        gen = gen.replace(df1Cont($scope.dateA), activeCont($scope.dateA));
                    } else if (gen.indexOf(df2Cont($scope.dateA)) > -1) {
                        gen = gen.replace(df2Cont($scope.dateA), activeCont($scope.dateA));
                    }
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
                var h = document.getElementById('calendarNgWidget').offsetHeight - 420;
                if (h <= 0) {h = 123;}
                return 'height: ' + h + 'px;' + $scope.calBoxTheme();
            };

            //Display box generic dynamic height function
            $scope.boxGHeight = function () {
                var h = document.getElementById('calendarNgWidget').offsetHeight - 420;
                if (h <= 0) {h = 123;}
                return 'height: ' + h + 'px;';
            };

            //Read and display calendar data
            $scope.calendarRead = function () {
                if ($scope.boxHide == false) {
                    var gen = '';
                    var sort = [];
                    var day = new Date($scope.yearA, $scope.monthA.val, $scope.dateA).getDay();
                    if ($scope.events != null){
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
                    if (gen == '' && $scope.events == null){
                        gen = '<br><p style="display: table; margin: 0 auto; text-align: center;">' +
                            'Press &nbsp;&#x21BB;&nbsp; to quick load the calendar.</p>'
                    } else if (gen == '' && $scope.events != null) {
                        gen = '<br><p style="display: table; margin: 0 auto; text-align: center;">' +
                            'No events today.<br></p><p style="color: #333; font-size: 10px; text-align: center;">' +
                            'Click on the&nbsp;<i class="material-icons" style="font-size:12px">' +
                            'create</i>&nbsp;to begin.</p>';
                    }
                    return gen;
                }
            };

            //Initialization for chrome.storage.sync
            chrome.storage.sync.get('events', function (data) {
                error();
                if (data.events == null){
                    chrome.storage.sync.set({'events': [], 'theme': 0}, function(){
                        error();
                        chrome.storage.sync.get('events', function (data) {
                            error();
                            $scope.events = data.events;
                            $scope.themeA = $scope.themes[data.theme];
                            $scope.data = data;
                            $scope.changeTheme();
                        });
                        chrome.storage.sync.getBytesInUse(null, function (data) {
                            console.info(data + ' bytes in use');
                        });
                    });
                } else {
                    chrome.storage.sync.get(null, function (data) {
                        error();
                        $scope.events = data.events;
                        $scope.themeA = $scope.themes[data.theme];
                        $scope.data = data;
                        $scope.changeTheme();
                    });
                    chrome.storage.sync.getBytesInUse(null, function (data) {
                        console.info(data + ' bytes in use');
                    });
                }
            });
        }

        //Create Process
        {
            //Display create box dynamic height function
            $scope.createHeight = function () {
                var h = document.getElementById('calendarNgWidget').offsetHeight - 420;
                if (h <= 0) {h = 123;}
                return 'height: ' + h + 'px;' + $scope.calBoxTheme();
            };

            //Initialize creating a calendar event
            $scope.startCreate = function () {
                $scope.boxHide = true;
                $scope.editHide = true;
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
                $scope.editHide = true;
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
                    $scope.badHide = false;
                    var f = function() {$scope.badHide = true};
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

                    if ($scope.editing == true) {
                        $scope.editing = false;
                        $scope.events.splice($scope.events.indexOf($scope.editingEV), 1);
                        delete $scope.data[$scope.editingEV];
                        chrome.storage.sync.set({events: $scope.events});
                        chrome.storage.sync.remove($scope.editingEV);
                        $scope.editingEV = '';
                    }

                    $scope.boxHide = false;
                    $scope.createHide = true;
                }
            };
        }

        //Edit Process
        {
            //Initialize editing events
            $scope.startEdit = function () {
                $scope.boxHide = true;
                $scope.editHide = false;
            };

            //Cancel editing events
            $scope.cancelEdit = function () {
                $scope.boxHide = false;
                $scope.editHide = true;
            };

            //Display edit box dynamic height function
            $scope.editHeight = function () {
                var h = document.getElementById('calendarNgWidget').offsetHeight - 420;
                if (h <= 0) {h = 123;}
                return 'height: ' + h + 'px;' + $scope.calBoxTheme();
            };

            //Read and display edit list
            $scope.editRead = function () {
                if ($scope.editHide == false) {
                    var gen = '';
                    var sort = [];
                    if ($scope.events.length > 0){
                        var b = 0;
                        for (a = 0; a < $scope.events.length; a++) {
                            var ev = $scope.events[a];
                            var date = $scope.data[ev][2].split(' ');
                            gen += editContainer($scope.data[ev][0], date[5], date[6], ev);
                            b++;
                            sort.push(gen);
                            gen = '';
                        }
                        sort.sort();
                        gen = sort.join('');
                    }
                    if (gen == '') {
                        gen = '<br><p style="display: table; margin: 0 auto; text-align: center;">' +
                            'Nothing to edit!<br></p><p style="color: #333; font-size: 10px; text-align: center;">' +
                            'Click on&nbsp;<i class="material-icons" style="font-size:12px">' +
                            'add</i>&nbsp;to create an event.</p>';
                    }
                    return gen;
                }
            };

            //Edit a previously existing event
            $scope.editTEvent = function(ev) {
                var date = $scope.data[ev][2].split(' ');
                $scope.editHide = true;

                $scope.yearA = Number(date[0]);
                $scope.monthA.val = Number(date[1]);
                $scope.dateA = Number(date[2]);

                $scope.createTitle = $scope.data[ev][0];
                $scope.createTime = 0;
                $scope.createDesc = $scope.data[ev][1];
                $scope.createRepeat = date[4];
                $scope.defCon = Number(date[5]);
                if (date[5] == 1) {$scope.star = 'star_half';}
                if (date[5] == 2) {$scope.star = 'star';}
                if (date[5] == 0) {$scope.star = 'star_border';}

                $scope.editing = true;
                $scope.editingEV = ev;
                $scope.createHide = false;
            };
        }

        //Delete Process
        {
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
                var h = document.getElementById('calendarNgWidget').offsetHeight - 420;
                if (h <= 0) {h = 123;}
                return 'height: ' + h + 'px;' + $scope.calBoxTheme();
            };

            //Read and display delete list
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
                    if (gen == ''){
                        gen = '<br><p style="display: table; margin: 0 auto; text-align: center;">' +
                            'No events to delete!</p>'
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
                    $scope.badHide = false;
                    var f = function() {$scope.badHide = true};
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
            };
        }

        //Customizing Process
        {
            //Initialize customizing calendar
            $scope.startCustom = function () {
                $scope.boxHide = true;
                $scope.customHide = false;
            };

            //Theme functions
            {
                $scope.calBarTheme = function () {
                    return 'background:' + $scope.themeCurrent[0] + '; color:' + $scope.themeCurrent[1] + ';';};
                $scope.calBoxTheme = function () {
                    return 'background:' + $scope.themeCurrent[2] + '; color:' + $scope.themeCurrent[3] + ';';};
                $scope.calCalTheme = function () {
                    return 'background:' + $scope.themeCurrent[4] + '; color:' + $scope.themeCurrent[5] + ';';};
                $scope.calToTheme = function () {
                    return 'background:' + $scope.themeCurrent[6] + '; color:' + $scope.themeCurrent[7] + ';';};
                $scope.calDf0Theme = function () {
                    return 'background:' + $scope.themeCurrent[8] + '; color:' + $scope.themeCurrent[11] + ';';};
                $scope.calDf1Theme = function () {
                    return 'background:' + $scope.themeCurrent[9] + '; color:' + $scope.themeCurrent[11] + ';';};
                $scope.calDf2Theme = function () {
                    return 'background:' + $scope.themeCurrent[10] + '; color:' + $scope.themeCurrent[11] + ';';};
                $scope.calBckTheme = function () {
                    return 'background:' + $scope.themeCurrent[12] + '; color:' + $scope.themeCurrent[13]};
                $scope.fooTheme = function () {
                    return 'background:' + $scope.themeCurrent[2] + '; color:' + $scope.themeCurrent[2] + ';';};
            }

            //BarBck, BarTxt, BoxBck, BoxTxt, CalBck, CalTxt, ToBck, ToTx, Df0, Df1, Df2, DfTxt, Background, BackgroundTxt
            $scope.changeTheme = function () {
                if ($scope.themeA.id == 0) {
                    $scope.themeCurrent = ['#000000;', '#ffffff;', '#e6e6e6', '#000000','#cccccc','#000000',
                        '#000000', '#ffffff', '#66ccff', '#ff9966', '#ff6666', '#ffffff', '#ffffff', '#000000'];
                }
                if ($scope.themeA.id == 1) {
                    $scope.themeCurrent = ['#337ab7;', '#ffffff;', '#e6e6e6', '#000000','#cccccc','#000000',
                        '#000000', '#ffffff', '#5bc0de', '#f0ad4e', '#d9534f', '#ffffff', '#ffffff', '#000000'];
                }
                if ($scope.themeA.id == 2) {
                    $scope.themeCurrent = ['#3b3b78;', '#d5d5dd;', '#777777', '#d5d5dd','#555555','#d5d5dd',
                        '#000000', '#d5d5dd', '#4095bf', '#bf8c40', '#b34d4d', '#d5d5dd', '#333333', '#d5d5dd'];
                }
                if ($scope.themeA.id == 3) {
                    $scope.themeCurrent = ['#82c600;', '#333333;', '#ffffff', '#000000', '#e6e6e6','#000000',
                        '#000000', '#ffffff', '#999999', '#4d4d4d', '#000000', '#ffffff', '#f2f2f2', '#000000'];
                }
                if ($scope.themeA.id == 4) {
                    $scope.themeCurrent = ['#205081;', '#ffffff;', '#e9e9e9', '#333333', '#cccccc','#333333',
                        '#000000', '#ffffff', '#59afe1', '#f79232', '#d04437', '#ffffff', '#ccd9ea', '#333333'];
                }
                if ($scope.themeA.id == 5) {
                    $scope.themeCurrent = ['#000000;', '#e0bd52;', '#cdc098', '#000000','#ded5ba','#000000',
                        '#000000', '#ffffff', '#999999', '#e0bd52', '#cc3833', '#ffffff', '#8f2724', '#000000'];
                }
                if ($scope.themeA.id == 6) {
                    $scope.themeCurrent = ['url("https://media.giphy.com/media/URZcG7uLd9h4s/giphy.gif");',
                        '#000000;', 'url("https://media.giphy.com/media/tbyi455ahTA6A/giphy.gif")', '#ffffff',
                        '#cccccc','#000000', '#000000', '#ffffff', '#00ff00', '#0000ff', '#ff0000', '#ffffff',
                        'url("http://media.giphy.com/media/kkoRgXbTCPY3K/giphy.gif")', '#ffffff'];
                }
            };

            //Change's theme font
            $scope.themeFont = function () {
                if ($scope.themeA.id == 0) {return 'Raleway';}
                if ($scope.themeA.id == 1) {return '$font-family-base';}
                if ($scope.themeA.id == 2) {return 'Oxygen';}
                if ($scope.themeA.id == 3) {return 'Hind Siliguri';}
                if ($scope.themeA.id == 4) {return 'Arial';}
                if ($scope.themeA.id == 5) {return 'Josefin Sans';}
                if ($scope.themeA.id == 6) {return 'Lakki Reddy';}
            };

            //Confirm customizing calendar
            $scope.confirmCustom = function () {
                chrome.storage.sync.set({theme: $scope.themeA.id});
                $scope.customHide = true;
                $scope.boxHide = false;
            };
        }

    }]);
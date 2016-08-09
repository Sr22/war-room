//FUNCTIONS USED IN CONTROLLER AND CALLED FUNCTION

//Check for errors in storing/retrieving
function error() {
    if(chrome.runtime.lastError)
    {
        console.log(chrome.runtime.lastError.message);
    }
}

//Month to day checker function
function mtd(y, m) {
    var ds;
    if (m == 0 || m == 2 || m == 4 || m == 6 || m == 7 || m == 9 || m == 11) {
        ds = 31;
    }
    if (m == 3 || m == 5 || m == 8 || m == 10) {
        ds = 30;
    }
    if (m == 1 && y % 4 == 0){ //Checks to see if it is a leap year
        ds = 29;
    }
    else if (m == 1 && y % 4 != 0){
        ds = 28;
    }
    return ds;
}

//foo day box function
function fooDay() {
    return '<td class="itemBox" style="background: #e6e6e6;"><button class="dateButton" id="foo" disabled="disabled"' +
        ' style="background: #e6e6e6; color: #e6e6e6;">foo</button></td>';
}

//Real day box function
function realDay(dt){
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calCalTheme()}}"><button type="button" class="dateButton" ' +
        'id="' + dt + '" ng-mousedown="activeHighlight(' + dt + '); calendarRead();">' + dt + '</button></td>';
}

//Today box function
function toDay(dt){
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calBarTheme()}}"><button type="button" class="dateButton" ' +
        'id="' + dt + '" ng-mousedown="activeHighlight(' + dt + '); calendarRead();" style="{{calBarTheme()}}">' + dt +
        '</button></td>';
}

//Event df0 no highlight box function
function df0Day(dt){
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calDf0Theme()}}"><button type="button" class="dateButton" ' +
        'id="' + dt + '" ng-mousedown="activeHighlight(' + dt + '); calendarRead();" style="{{calDf0Theme()}}">' + dt +
        '</button></td>';
}

//Event df1 no highlight box function
function df1Day(dt){
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calDf1Theme()}}"><button type="button" class="dateButton" ' +
        'id="' + dt + '" ng-mousedown="activeHighlight(' + dt + '); calendarRead();" style="{{calDf1Theme()}}">' + dt +
        '</button></td>';
}

//Event df2 no highlight box function
function df2Day(dt) {
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calDf2Theme()}}"><button type="button" class="dateButton" ' +
        'id="' + dt + '" ng-mousedown="activeHighlight(' + dt + '); calendarRead();" style="{{calDf2Theme()}}">' + dt +
        '</button></td>';
}

//Normal no highlight box function
function inactiveCont(dt) {
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calCalTheme()}}">';
}

function todayCont(dt) {
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calBarTheme()}}">';
}

function df0Cont(dt) {
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calDf0Theme()}}">';
}

function df1Cont(dt) {
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calDf1Theme()}}">';
}

function df2Cont(dt) {
    return '<td  class="itemBox" id="dt' + dt + '" style="{{calDf2Theme()}}">';
}

//Active highlight box function
function activeCont(dt){
    return '<td  class="itemBox" id="dt' + dt + '" style="background: #888">';
}

//Initial week generation function
function calendarFirWeek(d) {
    var script = '<tr>';
    if (d != 0) { //Checks for first N/A days of the week
        for (a = 0; a < d; a++) {script += fooDay();}
    }
    for (a = d; a < 7; a++) {script += realDay(dt); dt++;}
    return script;
}

//Week generation function
function calendarNrmWeek(){
    var a;
    var script = '</tr><tr>';
    for (a = 0; a < 7; a++) {script += realDay(dt); dt++;}
    return script;
}

//Final weeks generation function
function calendarFinWeek(y, m){
    var script = '</tr><tr>';
    for (a = 0; a < 7; a++) {
        if (dt < mtd(y, m) + 1) {script += realDay(dt); dt++;} //Checks for final N/A days fo the week
        else {script += fooDay();}
    }
    return script;
}

//Event display function
function eventContainer(title, desc, defCon, time){
    var at = '';
    if (time != '....' && time) {
        var hr = time.slice(0,2);
        var mn = time.slice(2,4);
        var apm;
        if (Number(hr) > 12){
            hr = Number(hr) - 12;
            apm = 'pm';
        } else if (Number(hr) < 12 && Number(hr) != 0) {
            apm = 'am';
        } else if (Number(hr) == 12){
            apm = 'pm';
        } else if (Number(hr) == 0){
            hr = 12;
            apm = 'am';
        }
        at = hr + ':' + mn + apm + ' - ';
    } else if (time == '....' && time) {
        at = 'All day - ';
    }
    var v = new Date().getTime();
    var gen = '<div class="reminderBox"';
    if (defCon == 0) {
        gen += 'id="' + time + 'dfC" style="{{calDf0Theme()}}">';
    }
    if (defCon == 1) {
        gen += 'id="' + time + 'dfB" style="{{calDf1Theme()}}">';
    }
    if (defCon == 2) {
        gen += 'id="' + time + 'dfA" style="{{calDf2Theme()}}">';
    }
    gen += at + title + '<br><small><em>' + desc + '</em></small></div>';
    return gen;
}

//Delete push function
function deletePush(deleteEvents, deleteCheck, ev) {
    if (deleteEvents.indexOf('*' + ev) == -1 && deleteEvents.indexOf(ev) == -1) {
        deleteEvents.push('*' + ev);
        deleteCheck.push('radio_button_unchecked');
    }
}

//Delete display function
function deleteContainer(title, defCon, time, id, num) {
    var at = '';
    var ev = id.toString();
    if (time != '....' && time) {
        var hr = time.slice(0,2);
        var mn = time.slice(2,4);
        var apm;
        if (Number(hr) > 12){
            hr = Number(hr) - 12;
            apm = 'pm';
        } else if (Number(hr) < 12 && Number(hr) != 0) {
            apm = 'am';
        } else if (Number(hr) == 12){
            apm = 'pm';
        } else if (Number(hr) == 0){
            hr = 12;
            apm = 'am';
        }
        at = hr + ':' + mn + apm + ' - ';
    } else if (time == '....' && time) {
        at = 'All day - ';
    }
    var v = new Date().getTime();
    var gen = '<div class="reminderBox"';
    if (defCon == 0) {
        gen += 'id="' + time + 'dfC" style="{{calDf0Theme()}}">';
    }
    if (defCon == 1) {
        gen += 'id="' + time + 'dfB" style="{{calDf1Theme()}}">';
    }
    if (defCon == 2) {
        gen += 'id="' + time + 'dfA" style="{{calDf2Theme()}}">';
    }
    gen += '<button class="deleteCheck" id="bt' + id + '"' +
        ' ng-mousedown="hitListUpdate(';
    gen += "'" + id + "'";
    gen += ', ' + num + ')">' + '<i class="material-icons" style="font-size:10px">{{deleteCheck[' + num + ']}}' +
        '</i></button>' + at + title + '</div>';
    return gen;
}
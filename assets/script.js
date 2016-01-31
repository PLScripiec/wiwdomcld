/**
 * Created by IKommu on 29/01/2016.
 */
$(function () {
    defaultConfRoutine();
    var moment = require('moment');
    var script = null;
    var spawn = null;
    $('#day').html(moment().format('dddd'));

    $('.c2').on('click', function () {
        if (!$(this).hasClass('stop')) {
            defaultConfRoutine();
            $(this).addClass('stop');
            $(this).html("Stop");
            spawn = require('child_process').spawn;
            script = spawn('cmd.exe', ['/c', 'wiwdomcld.bat']);
            script.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
            });

            script.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
            });

            script.on('exit', function (code) {
                console.log('child process exited with code ' + code);
            });
        } else {
            $(this).removeClass('stop');
            $(this).html("Start");
            if (spawn != null) {
                script.kill();
            }
        }
    });

    $('.c1').on('click', function () {
        defaultConfRoutine();
        if (isInteger($('#interval').val())) {
            var timer = 'timer=' + $('#interval').val();
            var path = 'output=' + $('#path').val();
            var fs = require('fs');
            fs.writeFile("conf/config.ini", timer + "\r\n" + path, function (err) {
                if (err) throw err;
            });
        } else {
            alert("Interval is not an integer.");
        }
    });
});

function isInteger(x) {
    return x % 1 === 0;
}

function defaultConfRoutine(){
    var fs = require('fs');
    fs.access('conf', fs.F_OK, function(err) {
        if (err) {
            console.log("creating conf");
            fs.mkdir('conf');
        }
    });
    fs.access('conf/config.ini', fs.F_OK, function(err) {
        if (err) {
            console.log("creating file");
            fs.writeFile("conf/config.ini", "timer=15\r\noutput=default", function(err) {
                if (err) throw err;
            });
        }
        fs.readFile("conf/config.ini", "utf8", function(err, data) {
            if (err) throw err;
            var timer = data.split("\r\n")[0].split("=")[1];
            var output = data.split("\r\n")[1].split("=")[1];
            $("#interval").val(timer);
            $("#path").val(output);
        });
    });
}
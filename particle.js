;
!(function(a) {
    var points = [],
        obj = document.createElement("canvas");
    console.log(a.lala);
    config = a.lala || {
            speed: 6,
            strokeColor: "100,200,500",
            pointColor: "rgb(121, 162, 185)",
            pointNum: 200,
            pointLength: 2,
            gravity: 0.02
        },
        obj.width = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth,
        obj.height = window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight,
        obj.style = "position: absolute; top: 0; left: 0; z-index: 999;",
        objFoo = obj.getContext("2d");

    document.getElementsByTagName('body')[0].appendChild(obj);

    function run() {
        objFoo.clearRect(0, 0, obj.width, obj.height);
        objFoo.beginPath();
        objFoo.fillStyle = config.pointColor;

        for (var i = 0, len = config.pointNum; i < len; i++) {
            if (points.length != config.pointNum) {
                var w = Math.floor(Math.random() * obj.width);
                var h = Math.floor(Math.random() * obj.height);
                var vw = (0.5 - Math.random());
                var vh = (0.5 - Math.random()) + config.gravity;
            } else {
                var w = points[i][0] + points[i][2] * config.speed;
                var h = points[i][1] + points[i][3] * config.speed;
                var vw = w < 0 || w > obj.width ? -points[i][2] : points[i][2];
                var vh = h < 0 || h > obj.height ? -points[i][3] : points[i][3] + config.gravity;
            }
            points[i] = [w, h, vw, vh, config.speed];
            objFoo.fillRect(w, h, config.pointLength, config.pointLength);
        }
        drawStroke();
        objFoo.closePath();
    }

    function drawStroke() {
        points.forEach(function(x, xx) {
            points.forEach(function(y) {
                var length = config.pointLength / 2;
                var x1 = x[0] + length;
                var y1 = x[1] + length;
                var x2 = y[0] + length;
                var y2 = y[1] + length;
                var dist = Math.round(x1 - x2) * Math.round(x1 - x2) + Math.round(y1 - y2) * Math.round(y1 - y2);
                var foo = 1 - dist / 5000;
                objFoo.strokeStyle = "rgba(" + config.strokeColor + "," + foo + ")";
                if (dist <= 5000) { //5000  0 -  2000 0.3      1000 0.4
                    objFoo.lineWidth = 0.4 - dist / 20000;
                    objFoo.beginPath();
                    objFoo.moveTo(x1, y1);
                    objFoo.lineTo(x2, y2);
                    objFoo.stroke();
                }
            })
            if (config.mouse) {
                var x1 = x[0] + length;
                var y1 = x[1] + length;
                var dist = Math.round(x1 - config.mouse.x) * Math.round(x1 - config.mouse.x) + Math.round(y1 - config.mouse.y) * Math.round(y1 - config.mouse.y);
                var foo = 1 - dist / 5000;
                objFoo.strokeStyle = "rgba(" + config.strokeColor + "," + foo + ")";
                if (dist <= 5000) { //5000  0 -  2000 0.3      1000 0.4
                    objFoo.lineWidth = 0.4 - dist / 20000;
                    objFoo.beginPath();
                    objFoo.moveTo(config.mouse.x, config.mouse.y);
                    objFoo.lineTo(x1, y1);
                    objFoo.stroke();
                    //改变点运动方向
                    //console.log(points[xx]);
                    points[xx][2] = (config.mouse.x - x1) / 50 / 2 * config.speed;
                    points[xx][3] = (config.mouse.y - y1) / 50 / 2 * config.speed;
                    //console.log(points[xx]);

                }

            }


        })
    }
    document.onmousemove = function(e) {
        var event = e || window.event;
        config.mouse = {
            x: event.clientX,
            y: event.clientY
        }
    }
    document.onmouseleave = function() {
        config.mouse = undefined;
    }
    window.onload = function() {
        setInterval(function() {
            run();
        }, 40);
    }
}(window))

var myArr = [];
var navmyInterHtml="";
var navaboutInterHtml="";
var dappAddress = "n1gWVy72o5dGfqiDmecRVtaCF6ozTJRtF3E";
var tx = "5e9426e7cd08c3b9e5569a31ac4c280074d71f2c55838ccada8fc70366c41642";
$(function() {
	
    $("#createbutton").click(function() {
        var name = $("#name").val().trim();
        var gender = $("#gender").val().trim();
        var birthDate = $("#datepicker").val().trim();
        if (name == "") {
            alert("请输入名字");
            return;
        }
        if (birthDate == "") {
            alert("请输入出生日期");
            return;
        }

        var obj = new Object();
        obj.owner = "";
        obj.name = name;
        obj.gender = gender;
        obj.birthDate = birthDate;



        var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
        var nebpay = new NebPay();
        var to = dappAddress;
        var value = "0";
        var callFunction = "save";
        var callArgs = '["' + name + '","' + gender + '","' + birthDate + '"]';
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp));
                alert("保存成功");
myArr.push(obj);
drawGraph(myArr);
            }
        });

    });

		
    $("#modal-30369").click(function() {
		if(myArr.length == 0){
			alert("当前家族数据为空，请先新建");
			return false;
		}
	});
	
    $("#transferbutton").click(function() {
		if(myArr.length == 0){
			alert("当前家族数据为空，请先新建");
			return false;
		}
        var wallettransfer = $("#wallettransfer").val().trim();
        var name = $("#nametransfer").val().trim();
        var gender = $("#gendertransfer").val().trim();
        var birthDate = $("#datepickertransfer").val().trim();
        if (wallettransfer == "") {
            alert("请输入钱包地址");
            return;
        }

        if (name == "") {
            alert("请输入名字");
            return;
        }
        if (birthDate == "") {
            alert("请输入出生日期");
            return;
        }

        var obj = new Object();

        obj.name = name;
        obj.gender = gender;
        obj.birthDate = birthDate;

        var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
        var nebpay = new NebPay();
        var to = dappAddress;
        var value = "0";
        var callFunction = "transfer";
        var callArgs = '["' + wallettransfer + '","' + name + '","' + gender + '","' + birthDate + '"]';
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp));
                alert("操作成功");
myArr.push(obj);
drawGraph(myArr);
            }
        });

    });
load();

});

function drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
    var theta = theta || 30,
    headlen = headlen || 10,
    width = width || 1,
    color = color || '#000',
    angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
    angle1 = (angle + theta) * Math.PI / 180,
    angle2 = (angle - theta) * Math.PI / 180,
    topX = headlen * Math.cos(angle1),
    topY = headlen * Math.sin(angle1),
    botX = headlen * Math.cos(angle2),
    botY = headlen * Math.sin(angle2);
    ctx.save();
    ctx.beginPath();
    var arrowX, arrowY;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
};

function drawGraph(myArr) {
    var canvas = document.getElementById("mycanvas");

    canvas.width = document.getElementById("mycanvasdiv").offsetWidth;
    canvas.height = document.getElementById("mycanvasdiv").offsetHeight;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(200,0,0)";
    ctx.font = "15px Georgia";

    var startX = 0;
    var startY = 0;
    var rectWidth = 350;
    var rectHeight = 30;

    for (var i = 0; i < myArr.length; i++) {
        ctx.strokeRect(startX, i * 30 * 2 + 10, rectWidth, rectHeight);
        ctx.fillText("姓名：" + myArr[i].name + "    性别：" + myArr[i].gender + "    生于：" + myArr[i].birthDate, 20, i * 30 * 2 + 30);
        if (i == myArr.length - 1) {
            continue;
        }
        drawArrow(ctx, rectWidth / 2 + 10, i * 60 + 40, rectWidth / 2 + 10, i * 60 + 70);
    }
};

function load() {
    var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    var to = dappAddress;
    var value = "0";
    var callFunction = "get";
    var callArgs = "[]";
    nebpay.simulateCall(to, value, callFunction, callArgs, {
        listener: function(resp) {
            //console.log(JSON.stringify(resp.result));
            if (resp.result == "") {
                alert("暂时没有你的家族记录，请点击新建按钮");
                return;
            }
            myArr = JSON.parse(JSON.parse(resp.result));
            if (myArr.length == 0) {
                alert("暂时没有你的家族记录，请点击新建按钮");
                return;
            }

            drawGraph(myArr);
        }
    });
}
var https = require('https');
var schedule = require('node-schedule');
var options = {
    hostname: 'wyjgzyy.govcloud.tencent.com',
    port: 443,
    path: '/preorder/add',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'sessionid': '76cca920-e92e-4614-877c-65a0caff5477'
    },
}
var interVal;

function appoint_mask(id, region1_name, region1_code, region2_name, region2_code, region3_code, region3_name, address) {
    var post_data = {
        "mobile": "", // 手机号
        "name": "", // 姓名
        "shop_id": "GZ0001",
        "category": "普通防护口罩",
        "zone": "广州市",
        "commodity_id": "100003",
        "number": 5,
        "changeable": "yes",
        "time_code": "0",
        "wxmsg": 2,
        "identity": id, // 身份证号码
        "identityType": "身份证", // 类型
        "street": region1_name+","+region2_name+","+region3_name, //和regionData配合,regionData1,regionData2,regionData3
        "addr": address, // 具体地址
        "regionData": [{ // 具体新行政区划分可查看:https://xingzhengquhua.51240.com/440100000000__xingzhengquhua/
            "regionName": region1_name,
            "regionCode": region1_code
        }, {
            "regionName": region2_name,
            "regionCode": region2_code
        }, {
            "regionName": region3_name,
            "regionCode": region3_code
        }],
        "idcard": "身份证," + id, // 类型,号码（类型普遍是身份证）
        "mail_address": address // 和regionData配合,regionData1,regionData2,regionData3,具体地址
    }
    var json = JSON.stringify(post_data);
    const req = https.request(options, (res) => {
        console.log('状态码:', res.statusCode);
        console.log('请求头:', res.headers);
        res.on('data', (d) => {
            console.log('response', d);
            console.log('data', JSON.parse(d))
        })
    })

    req.on('error', (e) => {
        console.error(e);
    })
    req.write(json);
    req.end();
}

let job = schedule.scheduleJob({
    hour: 19,
    minute: 59
}, function () {
    console.log('start');
    interVal = setInterval(() => appoint_mask("xxxx", "番禺区","440113000000","钟村街道","440113003000","祈福新邨","440113003002","xxxx"), 1000);
})

schedule.scheduleJob({
    hour: 20,
    minute: 05
}, function () {
    console.log('stop');
    clearInterval(interVal);
})
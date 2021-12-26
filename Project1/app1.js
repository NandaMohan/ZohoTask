const express = require('express');
var http = require('follow-redirects').http;
const parser = require('xml-js');
const jwt = require('jsonwebtoken');
var admin = require("firebase-admin");
const moment = require('moment');
const router = express.Router(); 

var notificationDetailOptions = {
    'method': 'POST',
    'port': 50000,
    'host': 'dxktpipo.kaarcloud.com',
    'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VIGNESH&receiverParty=&receiverService=&interface=SI_NOTIF_DETAIL&interfaceNamespace=http://v.com/pm',
    'headers': {
        'Content-Type': 'text/xml',
        'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
    },
    'maxRedirects': 20
};

router.post('/dashboard/notification/detail', (req, res) => {
    var notification = req.body.notif;
    console.log(req.body);
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Body>
       <urn:ZBAPI_NOTIF_DETAIL_PM>
          <NOTIF>${notification}</NOTIF>
          <ACTIVITIES></ACTIVITIES>
          <CAUSE></CAUSE>
          <IT_ITEMS></IT_ITEMS>
          <LONGTEXT></LONGTEXT>
          <PARTNER></PARTNER>
          <TASKS></TASKS>
       </urn:ZBAPI_NOTIF_DETAIL_PM>
    </soapenv:Body>
 </soapenv:Envelope>`;

    const req1 = http.request(notificationDetailOptions, function (res1) {
        const chunks = [];

        res1.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res1.on("end", function (chunk) {
            const b = Buffer.concat(chunks);
            const xml = b.toString();
            const data = parser.xml2json(xml, { compact: true, spaces: 4 });
            var head = [];
            const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:ZBAPI_NOTIF_DETAIL_PM.Response'];
            try {
                var a = {};
                a['header'] = resp['HEADER'];
                console.log(a['header']['FUNCT_LOC']['_text']);
                // console.log(a['header']['FUNCLDESCR']['_text']);

                Object.assign(a['header'], resp['TEXT']);
                Object.assign(a['header'], resp['PARTNER']['item']);
                if (a["header"]["FUNCT_LOC"]["_text"] === undefined) {a["header"]["FUNCT_LOC"]["_text"] = "-";}
                if (a["header"]["FUNCLDESCR"]["_text"] === undefined) {a["header"]["FUNCLDESCR"]["_text"] = "-";}
                if (a["header"]["NOTIF_DATE"]["_text"] === undefined) {a["header"]["NOTIF_DATE"]["_text"] = "-";}
                if (a["header"]["NOTIFTIME"]["_text"] === undefined) {a["header"]["NOTIFTIME"]["_text"] = "-";}
                if (a["header"]["SYS_STATUS"]["_text"] === undefined) {a["header"]["SYS_STATUS"]["_text"] = "-";}
                if (a["header"]["SHORT_TEXT"]["_text"] === undefined) {a["header"]["SHORT_TEXT"]["_text"] = "-";}
                if (a["header"]["EQUIPMENT"]["_text"] === undefined) {a["header"]["EQUIPMENT"]["_text"] = "-";}
                if (a["header"]["EQUIDESCR"]["_text"] === undefined) {a["header"]["EQUIDESCR"]["_text"] = "-";}
                if (a["header"]["PARTNER"]["_text"] === undefined) {a["header"]["PARTNER"]["_text"] = "-";}
                if (a["header"]["PRIORITY"]["_text"] === undefined) {a["header"]["PRIORITY"]["_text"] = "-";}
                head.push(a['header']);
                // console.log(a);
                // head.push({'header':resp['HEADER'],'text':resp['TEXT']});
                // head.push({'text':resp['TEXT']});
            } catch (error) {
                return res.status(404).send({ message: 'Data not available for this user' });
            }

            try{head[0]['EQUIPMENT']['_text'] = head[0]['EQUIPMENT']['_text'].replace(/^0+/, '');}
            catch{head[0]['EQUIPMENT']['_text'] = '-';}
            try{head[0]['PARTNER']['_text'] = head[0]['PARTNER']['_text'].replace(/^0+/, '');}
            catch{head[0]['PARTNER']['_text'] = '-';}
            try{head[0]['NOTIF_DATE']['_text'] = moment( head[0]['NOTIF_DATE']['_text'], "YYYY-MM-DD").format("DD-MM-YYYY");}
            catch{head[0]['NOTIF_DATE']['_text']='-';}

            res.send({ data: head });
        });

        res1.on("error", function (error) {
            console.error(error);
        });
    });

    req1.write(postData);
    req1.end();
});


var notificationStatusChangeOptions = {
    'method': 'POST',
    'port': 50000,
    'host': 'dxktpipo.kaarcloud.com',
    'path': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VIGNESH&receiverParty=&receiverService=&interface=SI_NOTIF_STATUS_CHANGE&interfaceNamespace=http://v.com/pm',
    'headers': {
        'Content-Type': 'text/xml',
        'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
    },
    'maxRedirects': 20
};

router.post('/dashboard/notification/status/change', (req, res ) => {
    var status = req.body.status.split(" ")[0];
    var notif = req.body.notif;
    console.log(status);
    var choice;
    if (status === 'NOPO') { choice = 1; }
    else if (status === 'NOPR') { choice = 2; }
    else if (status === 'NOCO') { choice = 3; }
    console.log(req.body);
    console.log(choice);
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Body>
       <urn:ZBAPI_NOTIF_STATUS_CHANGE_PM>
          <CHOICE>${choice}</CHOICE>
          <NOTIF_NO>${notif}</NOTIF_NO>
       </urn:ZBAPI_NOTIF_STATUS_CHANGE_PM>
    </soapenv:Body>
 </soapenv:Envelope>`;

    const req1 = http.request(notificationStatusChangeOptions, function (res1) {
        const chunks = [];

        res1.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res1.on("end", function (chunk) {
            const b = Buffer.concat(chunks);
            const xml = b.toString();
            const data = parser.xml2json(xml, { compact: true, spaces: 4 });
            const resp = JSON.parse(data)['SOAP:Envelope']['SOAP:Body']['ns0:ZBAPI_NOTIF_STATUS_CHANGE_PM.Response'];
            console.log(resp);
            try {
                if (choice === 3 && (resp['SYS_STATUS']['_text'] === "NOCO" || resp['SYS_STATUS']['_text'].includes("NOCO"))) {
                    return res.status(200).send({ message: 'Sucess' });
                }
                else if (choice === 2 && resp['SYS_STATUS']['_text'] === "NOPR") {
                    return res.status(200).send({ message: 'Sucess' });
                }
                else if (choice === 1 && resp['SYS_STATUS']['_text'] === "NOPO") {
                    return res.status(200).send({ message: 'Sucess' });
                } 
            } catch (error) {
                return res.status(404).send({ sts: 'Data not available for this user' });
            }
        });

        res1.on("error", function (error) {
            console.error(error);
        });
    });

    req1.write(postData);
    req1.end();
});
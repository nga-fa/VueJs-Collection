function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


exports.verifier = async function (emailList) {

    let response = {
        data: []
    };

    for (let i = 0; i < emailList.length; i++) {

        let domain;
        let format = validateEmail(emailList[i]);

        console.log("Email:" + emailList[i] + "\ncheckpoint 1")

        if (!format) {
            domain = false
        } else {
            console.log("checkpoint 2")
            try {
                domain = await testDomain(emailList[i]);
            } catch (e) {
                console.log(e)
            }
        }

        console.log("checkpoint 6")

        response.data.push({
            email: emailList[i],
            format: format,
            domain: domain,
        });
    }
    console.log("checkpoint 7")

    const name = await saveFile(response);

    console.log("response in worker function: "+response)

    return {
        response,
        name,
    }
}

function saveFile(data){

    let date = new Date();
    let name = date.toISOString().toString();
    name = name.replace(/:/g, '-');
    name = "data\\output\\" + name.slice(0,-2) + ".json";

    require('write-json').sync(name, data);

    return name;
}

const domainPing = require("domain-ping");

async function testDomain(email) {
    try{
        console.log("checkpoint 3")
        const r = await domainPing(email.slice(email.indexOf('@') + 1));
        console.log("checkpoint 4")
        let res = r.online || r.ping;
        console.log("res in .then: "+ res);
        return res;
    }catch(e) {
        let res = false;
        console.log("checkpoint 5")
        return  res;
    }
}

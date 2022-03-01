const { rejects } = require('assert');
const Axios = require('axios');
const fs = require('fs');


var filepath = ".\\downloads";

// Find number of items in .\downloads\
var i = 1;
fs.readdirSync(filepath).forEach(file => {
    i = i + 1;
});

// Name of new file
filepath = filepath + "\\f"+ i + ".png";

//write your own messgae
var message = `Mera naam Raajes hai, aur
Mujhe paani peene ki aadat hai.`;

// Adding message to URL for QR code generation
var url = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=" + message;

// Accessing and Downloading the .png file
async function downloadImg(url, filepath) {
    const response = await Axios({url, method:'GET', responseType: 'stream'});

    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath)).on('error', reject).once('close', () => resolve(filepath));
    });
}

downloadImg(url, filepath);

console.log("Done")
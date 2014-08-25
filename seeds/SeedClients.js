var Client = require('../app/models/ModelClient');

var clientNames = 'Digiware Yoloo Livewire Deminder Linkfire Riffclub Buzzshots Topbridge Feedfish Yavu Skita Myba Wordzoom Pixotz Thoughtvine Trulith Rifffeed Twittercube Kaynte Avamia Dynando Centinyx Skipverse Thoughtspan Blogspace Quiva Dazzlepulse Nlinks Feeddrive Agimbo Tagware Demilith Zamm Javee Demizzy Yakitri Chatlinks Ondu Jabberpath Kaylium Rhyndo Brainverse Brightbridge Thoughtpedia Blueify Twinu Centindo Dynanyx Fivebean Eiva Tava Skipshare Cogideo Thoughtbeat Podpoint Jetmix Youlist Wordchat Yakitri Twitterset Tekworks Realcast Realify Tekset Camimbee Quilane Jabberwire Ooveo Kaybox Linkify Bluefly Zoolith Edgeify Brainpad Zambu Kanoodle Mynte Jetfly Mype Podjam Topicfish Skayo'.split(' ');
var streetNames = ['Southeast Hawkchurch Place', 'North Willow Bridge', 'Fulham Palace Oval', 'West Copped Hall', 'Shelerud Pathway', 'Lake Joy', 'Mystique Mount', 'East  rentford High', 'Maysenger Promenade', 'Buyuma Causeway', 'Los Felicas  auseway', 'South Stone Road', 'East Torlai Parkway', 'East William Booth Bay', 'West Christopher Michael Alley', 'North Elm Sea', 'Northeast Acklam Walk', 'North Sunny Glen Close', 'Doctor Manor', 'Mellor Park', 'East Grand Valley', 'East Degroate Arcade', 'Woolmead Bay', 'Deveraux Loop', 'West Binnie Arcade', 'North Salem Church Bypass', 'East Ulverston Quay', 'North Diameter Cove', 'Toms Hill Quay', 'Southwest Blythe Hill Knoll', 'Honolulu Spur', 'West Wonham Oval', 'East Ridge Farm Grade', 'Lou Close', 'South Mersey Bank', 'Karloo lley', 'Valorie Crescent Southeast', 'Lumns Trace', 'North New Horwich Bay', 'Deeves Hall Knoll East', 'West Fordyke Drive', 'West Harbor Ridge Close', 'Justinian Manor', 'South Redbird Route', 'Wessen View', 'Hillfield Spur  Northeast', 'Kirkgate High View', 'West Camarillo Way', 'Denholme Court', 'Stratton Chase Green'];

function generateClients (quantity) {
  for (var i = 0; i < quantity; i++) {
    var clientName = clientNames[Math.floor(Math.random() * clientNames.length)];
    var email      = 'contact@' + clientName.toLowerCase() + '.com';
    var address    = streetNames[Math.floor(Math.random() * streetNames.length)] + ' ' + Math.floor((Math.random() * 1500) + 1);
    var telephone  = '';

    for (var j = 0; j < 8; j++) {
      if (j === 0) {
        telephone += 4;
      } else {
        telephone += Math.floor(Math.random() * 10);
      }
    }

    var instance = new Client({
      clientName: clientName,
      email     : email,
      address   : address,
      telephone : parseInt(telephone)
    });

    instance.save(function (err, res) {
      if (err) {
        console.error(err);
      }
    });
  }

  console.log('Clients generated');
};

module.exports = generateClients;

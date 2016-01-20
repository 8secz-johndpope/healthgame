var app = require("../templates.js")

var fs = require("fs")
var path = require("path")
var should = require("should")
var supertest = require("supertest")

var testdata = JSON.parse(fs.readFileSync("./testdata.json", "utf8"));
var d = new Date();

describe('daiLys', function () {
	describe('generating html files from testdata.json', function () {

		for(var obj in testdata){
			testdata[obj].dateS = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();
			it('should generate ./results/daily/'+testdata[obj].user.name+"_"+testdata[obj].dateS+"_"+obj+".html", function (done) {
				app.renderLetter(testdata[obj],obj,function(){
					var e = fs.existsSync(path.join(__dirname,"/results/daily/"+testdata[obj].user.name+"_"+testdata[obj].dateS+"_"+obj+".html"));
					if (e) {done();}
				});
			});
		}
	});
});

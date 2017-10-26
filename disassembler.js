

const buffer = require('buffer');
const helpers = require('./parseHelpers'); //loads helper methods
const fs = require('fs');

console.log("Loading OpCodes");
const opcodeTable = JSON.parse(fs.readFileSync('./opcodes.json', 'utf8')); //loads opcode table

console.log("Loading game rom");
if(process.argv.length < 3){
	throw "No file found!";
}
const data = fs.readFileSync(__dirname + "/" + process.argv[2]);
let hex = (new Buffer(data,'utf8')).toString('hex');
hex = helpers.splitBytes(hex); //parse data to array of bytes
//const dump = disassemble(hex);  //disassemble file

function disassemble(hexdump,pc){
	//console.log('Disassembling file');
	let ele = hexdump[pc]; //current element
	let line = pc + "\t" + ele + "\t";
	let opbytes = parseInt(opcodeTable[ele].size);
	switch(parseInt(opcodeTable[ele].size)){
		case 1:
			line += opcodeTable[ele].name + "\n";
			break;
		case 2:
			line += hexdump[pc+1] + "\t" +  opcodeTable[ele].name + " " + hexdump[pc+1] + '\n';
			break;
		case 3:
			line += hexdump[pc+1] + " " + hexdump[pc+2] + "\t" + opcodeTable[ele].name + " " + hexdump[pc+2] + "" + hexdump[pc+1] + '\n';
			break;
	}
	console.log(line);

	
	/*console.log("Saving disassembly....");
	fs.writeFile('dump.disassembled',disassembledDump,(error) => {
		if(error){
			console.log(error);
			throw "Error saving file!";
		}
		console.log("File saved!");
	});*/
	return opbytes;
	
}


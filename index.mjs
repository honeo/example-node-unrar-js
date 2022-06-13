import unrar from 'node-unrar-js';
import fsp from 'node:fs/promises';

const res = await fetch('https://getsamplefiles.com/download/rar/sample.rar');
const buf_rarArchive = await res.arrayBuffer();
const extractor = await unrar.createExtractorFromData({
	data: buf_rarArchive
});
const {arcHeader, files} = extractor.extract({});

/*
	Unrelated, but just in case.
	I'm sure it won't work because it doesn't take into account the directory of pathways.
*/
for(let {fileHeader, extraction} of files){
	fileHeader.flags.directory ?
		await fsp.mkdir(fileHeader.name):
		await fsp.writeFile(fileHeader.name, extraction);
}

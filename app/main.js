import ffmpeg from "npm:ffmpeg@^0.0.4";
import ffprobe from "npm:ffprobe-client@^1.1.6";
import { ensureDirSync } from "jsr:@std/fs";
import { parseArgs } from "jsr:@std/cli/parse-args";


// Check if dir exists, else create it
const outputDir = "./output";
ensureDirSync(outputDir);
console.log(`Directory "${outputDir}" created!`);

// Parse the args
// const args = parseArgs(Deno.args);
const args = Deno.args;
console.log(args);
const file = args[0];
const ext = args[1];

function compressVideo(inputFilePath, extension) {
    try {
        const process = new ffmpeg(inputFilePath);
        const fileName = inputFilePath.split("\\").slice(-1)[0];
        const fileNameWithoutExt = fileName.slice(0, -4);
        // const fileExt = fileName.slice(-4);

        process.then((video) => {
            console.log(video.metadata);
            video
                .setVideoFormat(extension)
                .setVideoSize('1280x720', true, true)
                .save(`${outputDir}/${fileNameWithoutExt}${extension}`, (error, file) => {
                    if (!error) {
                        console.log(`File "${file}" has been successfully compressed!`);
                    }
                    else console.error(error);
                })
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
}

compressVideo(file, ext);

// Run an infinite loop terminal
// setInterval(() => {}, 1000);
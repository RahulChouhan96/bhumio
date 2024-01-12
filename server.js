const Tesseract = require('tesseract.js');


function extractText(filePath) {
    Tesseract.recognize(
        filePath, "eng", { logger: m => null }
    ).then(({ data: { text } }) => {
        const lines = text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const num = Number(line.split(".")[0]);
            if (isNaN(num) || !line.toLowerCase().includes("unkn"))
                continue;

            const ansLetters = line.split("Yes")[1];
            let ans = "Yes";
            if (ansLetters.toLowerCase().split("unkn")[0].includes("no"))
                ans = "No";
            
            console.log(num, "->", ans, "\n");
        }
    });
}

extractText("./Images/Input_2.jpg");
var TesseractJS = require('tesseract.js')


const imageParser = {

    textToObj: (textArr) => {
        const table = {};
    table.tableName = textArr[0];

    for(let i = 1; i < textArr.length; i++){
        table[i-1] = textArr[i]
    }
    console.log('****table result', table)
    return table
    },

     cleanText: (text) => {
        console.log('======GOT TEXT=====')
        const lineSplit = text.split('\n')
    
        let spaceSplit = {}
        let finalArr = [];
    
        lineSplit.forEach((e) => {
            let a = e.replace(/[^A-Za-z\s]/g, '').trim();
            const b = a.split(' ')
    

            if(b[2] === 'REFERENCES'){
                let val = b[4];
                b.pop();
                let newVal = `(${val})`
                b.push(newVal);
               let c = b.join(' ');
                a = c;
                 }
            if(a !== '') finalArr.push(a)
        })
        console.log('=====CLEANED TEXT====')
        return imageParser.textToObj(finalArr);
    },



    runTesseract: (req,res,next) => {
        const imgArr = req.body;
        // const imgArr = arr;
        promiseArr = [];

        for(let key in imgArr){

            const abc = new Promise((resolve,reject) => {
                TesseractJS.recognize(imgArr[key])
                  .progress((p) => {
                //   console.log('progress',p)
                  })
                  .then((result) => {
                      console.log('====GOT TEXT');
                      resolve(imageParser.cleanText(result.text));
                  })
            });

            promiseArr.push(abc)
        }

        Promise.all(promiseArr).then((data) => {
            TesseractJS.terminate();
            res.locals.tables = data;
            res.locals.url = req.body.url;
            console.log('DATA: ',data)
            next();
        }).catch((err) => {
            console.log('!!!!!!!!', err)
        })
    }
}

// imageParser.runTesseract(testImgArr);




module.exports = imageParser






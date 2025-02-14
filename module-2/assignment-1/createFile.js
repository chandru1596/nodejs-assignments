const yargs = require('yargs')
const fs= require('fs')
const path = require ('path')
const content= 'you are awesome'

yargs.command(
    'create',
    'create a file',
    {file:{               //node createFile.js create --file=demo.txt
        describe:'file to create',   
        demandOption:true,
        type:'string'
    }},
    (argv)=>{
        console.log(argv)
        // const directoryPath='C:/Users/3603/Desktop/nodejs assignments/module-2/assignment-1/files'  // this is my path
        const directoryPath= path.join(__dirname,'files')  // for other environments using dynamic path
        const filePath= path.join(directoryPath,argv.file)
        console.log(directoryPath)
        
        // to ensure whether the directory exist
        if(!fs.existsSync(directoryPath)){
            fs.mkdir(directoryPath,{recursive:true})
        }

        fs.readdir(directoryPath,(err,files)=>{
            if(err){
                console.error(err)
                return
            }
            else{
                if(files.includes(argv.file)){
                    console.log('file name already exist')
                    console.log('files',files)
                }
                else{
                    fs.writeFile(filePath,content,(err)=>{
                        if(err){
                            console.error(err)
                            return
                        }
                        console.log(argv.file,'file created successfully')
                    })
                }
            }
        })

    }
).parse()
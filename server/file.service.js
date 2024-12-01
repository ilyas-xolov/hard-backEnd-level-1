import fs from 'fs'
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FileService {
    save(file){
        try {
            const fileName = uuidv4() + '.jpg';  // c45c7176-04d9-40e2-ad6a-22a6e8ecd43a.jpg
            const currentDir = __dirname; //  C:\Projects\Hard BackEnd\level-1\
            const staticDir = path.join(currentDir,'..','static'); // C:\Projects\Hard BackEnd\level-1\static
            const filePath = path.join(staticDir,fileName); // C:\Projects\Hard BackEnd\level-1\static\d2283d3a-af50-4dfe-9ca2-ba3fe83dfc55.jpg

            if(!fs.existsSync(staticDir)){
                fs.mkdirSync(staticDir, {recursive: true});
            }

            file.mv(filePath)
            return fileName;
        } catch (error) {
            console.log(`ERROR saving file: ${error}`)
        }
    }
}

export default new FileService()
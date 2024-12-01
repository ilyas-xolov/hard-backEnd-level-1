import fs from 'fs'
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FileService {
    save(file){
        try {
            const fileName = uuidv4() + '.jpg';  
            const currentDir = __dirname;
            const staticDir = path.join(currentDir,'..','static');
            const filePath = path.join(staticDir,fileName);

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
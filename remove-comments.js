const fs = require('fs');
const path = require('path');


const TARGET_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
const IGNORE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build'];

// 주석 제거 함수 (//@ts-ignore는 보존)
function removeComments(content) {
  return content
    .split('\n')
    .map(line => {
      // //@ts-ignore 주석은 보존
      if (line.includes('//@ts-ignore')) {
        return line;
      }
      
      return line.replace(/\/\/.*$/, '');
    })
    .join('\n')
    //  형태의 주석 제거 (//@ts-ignore는 이미 처리되었으므로 안전)
    .replace(/\/\*[\s\S]*?\*\//g, '');
}


function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        processDirectory(fullPath);
      }
    } else if (TARGET_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const newContent = removeComments(content);
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Processed: ${fullPath}`);
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
      }
    }
  });
}


console.log('Starting to remove comments...');
processDirectory(process.cwd());
console.log('Comment removal completed!');

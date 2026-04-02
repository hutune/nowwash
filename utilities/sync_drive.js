const fs = require('fs');
const path = require('path');
const https = require('https');

const CREDENTIALS_PATH = path.join(require('os').homedir(), '.config/mcp-gdrive/.gdrive-server-credentials.json');
const WORKSPACE_DIR = path.resolve(__dirname, '..');

// Map of folder IDs to local folder names
const FOLDER_MAP = {
  '1qYGt8gtYQISswP_YWs_veA654kW3p_3o': '.', // Root NowX folder
  '1ZXwEjITKUfNiLBr6wa9P2ciokPUB6LxT': '01_Legal_Admin',
  '1QHmzp-RjRDceIsrEhvhx9-Bx275rLvns': '02_Finance_Accounting',
  '1fHjopnpsT9n1GJ-MnYxyQfl_N2jCVzhL': '03_Customers',
  '1fb7gNbMfIoZTi81JG4l7MlK8PEPRDLUF': '04_Partners_Vendors',
  '1nwh5oMovmLGgbxG3C8HQ-bnMbYlC8rxu': '05_Operations',
  '1mDijPxDp_QAuxnsFnTEPu1PRwfkxk-TB': '06_Product_Tech',
  '1SFgZta2Txwg_TrD8NEVNS_zXbIEN4hrO': '07_Marketing_Brand',
  '1s7al6J2tFSWd2XSvyFRdXRG2KcHhkm34': '08_HR_Internal',
  '1NO9c5pxxgtmnevuk64zczDqirxNSeAcz': '09_Strategy_Management',
  '1Y-ZtFwk8dzRh7rZm-VFPSMhqVzl3STfB': '10_Templates',
  '1srgye-AtT9SOkZNUk9iUeqqWg33mRiwg': '99_Archive'
};

async function getAccessToken() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(`Khoá xác thực không tồn tại ở ${CREDENTIALS_PATH}. Hãy hoàn tất đăng nhập MCP.`);
  }
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  return creds.access_token;
}

async function fetchFromDrive(url, accessToken, isBinary = false) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    };
    https.get(url, options, (res) => {
      // Handle redirects for binary downloads
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchFromDrive(res.headers.location, accessToken, isBinary));
      }
      
      if (res.statusCode !== 200) {
        return reject(new Error(`Tải thất bại. Mã lỗi: ${res.statusCode}`));
      }

      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve(isBinary ? buffer : buffer.toString('utf8'));
      });
    }).on('error', reject);
  });
}

async function sync() {
  console.log('Bắt đầu đồng bộ Google Drive. Đọc Access Token...');
  const token = await getAccessToken();

  for (const [folderId, folderName] of Object.entries(FOLDER_MAP)) {
    console.log(`\nĐang quét thư mục: ${folderName === '.' ? 'Root (Thư mục gốc)' : folderName}...`);
    
    const query = encodeURIComponent(`'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and mimeType != 'application/vnd.google-apps.shortcut' and trashed = false`);
    const listUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType)`;
    
    try {
      const resp = await fetchFromDrive(listUrl, token);
      const files = JSON.parse(resp).files || [];
      
      if (files.length === 0) {
        console.log(`  -> Trống.`);
        continue;
      }

      for (const file of files) {
        try {
          let downloadUrl;
          let filename = file.name;
          let isBinary = true;
          
          if (file.mimeType === 'application/vnd.google-apps.document') {
            downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=text/plain`;
            filename += '.md';
            isBinary = false;
          } else if (file.mimeType === 'application/vnd.google-apps.spreadsheet') {
            downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}/export?mimeType=text/csv`;
            filename += '.csv';
            isBinary = false;
          } else {
            downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
          }

          console.log(`  -> Đang tải: ${filename}`);
          
          const targetPath = path.join(WORKSPACE_DIR, folderName, filename);
          const fileContent = await fetchFromDrive(downloadUrl, token, isBinary);
          
          fs.writeFileSync(targetPath, fileContent);
          console.log(`     ✅ Lưu tại ${folderName}/${filename}`);
        } catch (fileErr) {
          console.error(`     ❌ Lỗi tải file ${file.name}: ${fileErr.message}`);
        }
      }
    } catch (err) {
      console.error(`Lỗi khi quét thư mục ${folderName}: ${err.message}`);
    }
  }
  console.log('\nĐồng bộ hoàn tất! 🎉');
}

sync().catch(err => console.error('Lỗi nghiêm trọng:', err));

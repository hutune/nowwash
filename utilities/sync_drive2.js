const fs = require('fs');
const path = require('path');
const https = require('https');

const CREDENTIALS_PATH = path.join(require('os').homedir(), '.config/mcp-gdrive/.gdrive-server-credentials.json');
const WORKSPACE_DIR = path.resolve(__dirname, '..');

const FILES_TO_DOWNLOAD = [
  { id: '1GlJI26FijYzftHuXotvSq-4Nk08dK1ik', name: '2.ĐIỀU LỆ.pdf', isBinary: true, format: 'alt=media' },
  { id: '1CSlzxtuImz-VRUzlE9kw-JNgu9csUZog', name: 'REPLUS.BẢNG THÔNG TIN.docx', isBinary: true, format: 'alt=media' },
  { id: '1kBjIUK5nNG-snfF2CrQGFY6OZYzEjvvL36jE-X56G7M', name: '00. Tài liệu chung.md', isBinary: false, format: 'export?mimeType=text/plain' },
  { id: '1E9jcmN40UOCjSHBhHVrlGxSIW3p4kZD5', name: '1.GIẤY ĐỀ NGHỊ.pdf', isBinary: true, format: 'alt=media' },
  { id: '11mpRFpGKOuctTEMr-utU2MjugsOkFYIJ', name: 'mou_replus_dinhphuongtinh.pdf', isBinary: true, format: 'alt=media' }
];

async function getAccessToken() {
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  return creds.access_token;
}

async function fetchFromDrive(url, accessToken, isBinary = false) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Authorization': `Bearer ${accessToken}` } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchFromDrive(res.headers.location, accessToken, isBinary));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Tải thất bại. Mã lỗi: ${res.statusCode}`));
      }
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(isBinary ? Buffer.concat(data) : Buffer.concat(data).toString('utf8')));
    }).on('error', reject);
  });
}

(async () => {
  const token = await getAccessToken();
  for (const file of FILES_TO_DOWNLOAD) {
    let downloadUrl;
    if (file.format.startsWith('export')) {
      downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}/${file.format}`;
    } else {
      downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?${file.format}`;
    }
    
    console.log(`Đang tải tập tin: ${file.name}`);
    const fileContent = await fetchFromDrive(downloadUrl, token, file.isBinary);
    fs.writeFileSync(path.join(WORKSPACE_DIR, file.name), fileContent);
    console.log(`✅ Lưu thành công!`);
  }
})();

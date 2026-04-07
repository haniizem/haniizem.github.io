/**
 * Deploy to Vercel using direct API calls (bypasses corporate SSL proxy)
 * Only deploys dist/ folder (pre-built by Vite)
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TOKEN = process.env.VERCEL_TOKEN || '';
const TEAM_ID = process.env.VERCEL_TEAM_ID || '';
const PROJECT_NAME = 'hani-portfolio';

if (!TOKEN) {
    console.error('Error: Set VERCEL_TOKEN environment variable');
    process.exit(1);
}

// Files to skip (too large or unnecessary)
const SKIP_FILES = ['train-background.mp4', 'use.txt'];

function apiRequest(method, apiPath, body = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(`https://api.vercel.com${apiPath}`);
        if (TEAM_ID) url.searchParams.set('teamId', TEAM_ID);

        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method,
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            rejectUnauthorized: false,
        };

        if (body) {
            const data = JSON.stringify(body);
            options.headers['Content-Length'] = Buffer.byteLength(data);
        }

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, data });
                }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

function uploadFile(sha, data, size) {
    return new Promise((resolve, reject) => {
        const url = new URL('https://api.vercel.com/v2/files');
        if (TEAM_ID) url.searchParams.set('teamId', TEAM_ID);

        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/octet-stream',
                'Content-Length': size,
                'x-vercel-digest': sha,
            },
            rejectUnauthorized: false,
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data: body }));
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

function getAllFiles(dir, rootDir = dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getAllFiles(fullPath, rootDir));
        } else {
            if (SKIP_FILES.includes(entry.name)) continue;
            const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
            results.push({ path: relativePath, fullPath });
        }
    }
    return results;
}

async function main() {
    const distDir = path.join(__dirname, 'dist');

    if (!fs.existsSync(distDir)) {
        console.error('Error: dist/ directory not found. Run "npm run build" first.');
        process.exit(1);
    }

    console.log('📦 Collecting files from dist/ only...');
    const files = getAllFiles(distDir);

    console.log(`Found ${files.length} files to deploy`);

    // Calculate total size
    let totalSize = 0;
    const fileData = [];
    for (const f of files) {
        const content = fs.readFileSync(f.fullPath);
        const sha = crypto.createHash('sha1').update(content).digest('hex');
        totalSize += content.length;
        fileData.push({
            file: f.path,
            sha,
            size: content.length,
            content,
        });
    }
    console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(1)} MB`);

    // Upload files
    console.log('⬆️  Uploading files...');
    let uploaded = 0;
    for (const f of fileData) {
        const result = await uploadFile(f.sha, f.content, f.size);
        uploaded++;
        if (uploaded % 20 === 0 || uploaded === fileData.length || uploaded === 1) {
            console.log(`  [${uploaded}/${fileData.length}] uploaded`);
        }
    }

    // Create deployment
    console.log('🚀 Creating deployment...');
    const deployBody = {
        name: PROJECT_NAME,
        files: fileData.map(f => ({
            file: f.file,
            sha: f.sha,
            size: f.size,
        })),
        projectSettings: {
            framework: null,
        },
        target: 'production',
    };

    const result = await apiRequest('POST', '/v13/deployments', deployBody);

    if (result.status === 200 || result.status === 201) {
        console.log('\n✅ Deployment successful!');
        console.log(`🌐 URL: https://${result.data.url}`);
        if (result.data.alias && result.data.alias.length > 0) {
            console.log(`🔗 Aliases: ${result.data.alias.join(', ')}`);
        }
        console.log(`📊 Status: ${result.data.readyState || result.data.status}`);
    } else {
        console.error('\n❌ Deployment failed:');
        console.error(JSON.stringify(result.data, null, 2));
    }
}

main().catch(err => {
    console.error('Fatal error:', err.message);
    process.exit(1);
});

let watch = false
let instances = 1
let exec_mode = 'fork'

module.exports = {
    apps: [
        {
            name: 'web-checkin',
            cwd: '/var/www/git-project/web-checkin',
            script: './index.js',
            exp_backoff_restart_delay: 100,
            instances,
            exec_mode,
            max_memory_restart: '512M',
            autorestart: true,
            env: {
                Z: 'Asia/Jakarta',
                NAMESPACE: 'web-checkin',
                APPID: 1,
                PORT: 3029,
                VERSION: '1.0.0',
                NODE_ENV: 'development',
                BASE_URL: 'https://stg-api.dailyact.com'
                // DEBUG: "web-checkin:*,queries:*,route:*"
            },
            env_production: {
                Z: 'Asia/Jakarta',
                NAMESPACE: 'web-checkin',
                APPID: 1,
                PORT: 3029,
                VERSION: '1.0.0',
                NODE_ENV: 'production',
                BASE_URL: 'https://api.dailyact.com'
            }
        }
    ]
}

const { EnvConfig } = require('./env.config');

const envConfig = new EnvConfig();

function init() {
    const oauthUrlList = [
        'NEXT_PUBLIC_OAUTH_START_LOGIN_URL',
    ];

    const apiUrlList = [
        'NEXT_PUBLIC_USER_INFO_URL', 'NEXT_PUBLIC_API_URL'
    ]

    envConfig.verifyKey(oauthUrlList)
    envConfig.verifyKey(apiUrlList)
    console.log('정상');
}

init();


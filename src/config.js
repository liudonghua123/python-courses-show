const config = {
    'dev': {
        'host': 'http://localhost:8080',
        'api': 'http://localhost:8080/api/'
    },
    'production': {
        'host': '',
        'api': '/api/'
    }
}
const env = process.env.ENV || 'dev';

export default config[env];
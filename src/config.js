const config = {
    'development': {
        'host': 'http://localhost:8080',
        'api': 'http://localhost:8080/api/'
    },
    'production': {
        'host': '',
        'api': '/api/'
    }
}
const env = process.env.NODE_ENV || 'development';

console.info(`process.env.NODE_ENV is ${process.env.NODE_ENV}`);

export default config[env];
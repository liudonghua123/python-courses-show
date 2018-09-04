const config = {
    'development': {
        'host': 'http://localhost:8080',
        'api': 'http://localhost:8080/api/?type=reactSortableTree'
    },
    'production': {
        'host': '',
        'api': '/api/?type=reactSortableTree'
    }
}
const env = process.env.NODE_ENV || 'development';

console.info(`process.env.NODE_ENV is ${process.env.NODE_ENV}`);

export default config[env];
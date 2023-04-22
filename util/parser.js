function parserError(err) {
    if(err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => e.message).join('\n');
    } else if(Array.isArray(err)) {
        return err.map(m => m.msg).join('\n');
    } else {
        return err.message;
        // return err.message.split('\n');
    }
}

module.exports = {
    parserError
}
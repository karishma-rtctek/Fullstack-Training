const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const body = Object.keys(req.body).length ? JSON.stringify(req.body) : 'no body';
    
    console.log(`\n🕒 [${timestamp}]`);
    console.log(`📍 ${method} ${url}`);
    console.log(`📦 Request Body:`, body);

    // Add response logging
    const originalSend = res.send;
    res.send = function (data) {
        console.log(`✅ Response Status:`, res.statusCode);
        return originalSend.apply(res, arguments);
    };

    next();
};

module.exports = requestLogger;
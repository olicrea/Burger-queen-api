//Aquí van las variables de entorno (en mayúscula)
exports.port = process.argv[2] || process.env.PORT || 8080;
exports.dbUrl = process.env.MONGO_URL || process.env.DB_URL || 'mongodb+srv://olimongo:963852741.Mongoatlas@cluster0.7q8ducq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

// exports.dbUrl = process.env.MONGO_URL || process.env.DB_URL || 'mongodb://127.0.0.1:27017/burguer_queen';
// exports.dbUrl = process.env.MONGO_URL || process.env.DB_URL || 'mongodb+srv://olimongo:963852741.Mongoatlas@cluster0.7q8ducq.mongodb.net/';

// mongodb+srv://olimongo:<password>@cluster0.7q8ducq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
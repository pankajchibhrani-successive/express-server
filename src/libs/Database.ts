"use strict";

import mongoose from "mongoose";


export class Database{

async disconnect(){
    return new Promise((resolve, reject) => {
        mongoose.connection.on("disconnected", () => {
            console.log("DB connection disconnected.");
            reject();
        });
    })
    
}

	async open() {
		return new Promise((resolve, reject) => {
			try {
				const dbName = process.env.DB_NAME;
				let dbUrl: any = process.env.MONGO_URL;
				const dbOptions = {useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,}
			
			//	logger.info("Connecting to -> " + dbUrl);
				mongoose.connect(dbUrl, dbOptions);

				// CONNECTION EVENTS
				// When successfully connected
				mongoose.connection.on("connected", function () {
			//		console.info(SERVER.DISPLAY_COLORS ? "\x1b[32m%s\x1b[0m" : "%s", `Connected to ${dbUrl}`);
					console.log("Connected to DB", dbName, "at", dbUrl);
					resolve();
				});
																		
			
				mongoose.connection.on("error", error => {
					
					reject(error);
				});

				// When the connection is disconnected
			
			} catch (error) {
				reject(error);
			}
		});
	}
}
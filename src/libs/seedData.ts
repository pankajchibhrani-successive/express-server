
export class SeedData {

	

	async bootstrapSeedData() {
		try {
			const userData = {
				"email": "pkpankajkumar05@gmail.com",
				"password": "Pankaj@87555",
				"name": "Pankaj"
            };
            
			const step1 = await userDao.isEmailExists(userData, {});
			if (!step1) userDao.createuser(userData);
		} catch (error) {
			return Promise.reject();
		}
	}
}
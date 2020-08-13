

export class Controller{

     async get(params) {
		try {
			
			return -params
		} catch (error) {
			throw error;
		}
	}

           
    async post(){
        return "post"
    }
    async put(){
        return "put"
    }

    async delete(){
        return "delete"
    }
}
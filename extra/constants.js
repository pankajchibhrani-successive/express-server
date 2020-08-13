
const constants = {
	TRAINEE_EMAIL: "trainee1@successive",  // skippable
	REVIEW_EMAIL: "eviewer1@successive.tech",
	
};

const users= [
	{
	traineeEmail:"trainee1@successive",
	reviewerEmail: "eviewer1@successive.tech",
	}
	]
const permission= {
		'getUsers': {
		all: ['head-trainer'],
		read : ['trainee', 'trainer'],
		write : ['trainer'],
		delete: [],
		}
	}

export let CONSTANT = Object.freeze({

    constants:constants,
	users:users,
	permission:permission
})
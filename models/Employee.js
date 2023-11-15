import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
	age: {
		type: String,
		required: [true, "Age is required!"],
		trim: true,
	},
	salary: {
		type: String,
		required: [true, "Salary is required!"],
		trim: true,
	},
	
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Employee ||
	mongoose.model("Employee", EmployeeSchema);

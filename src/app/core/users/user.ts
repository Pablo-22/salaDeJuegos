import { DataEntity } from "../dataEntity/data-entity";
import { Log } from "../logs/log";

export class User extends DataEntity {
	email:string;
	password:string;
	userLogs:Log[];

	constructor(){
	  	super();
		this.email = '';
		this.password = '';
		this.userLogs = [];
	}
}

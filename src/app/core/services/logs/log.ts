import { DataEntity } from "../../models/dataEntity/data-entity";

export class Log extends DataEntity {
	objectId:string = '';
	objectName:string = ''
	createdDate:Date = new Date();
	value:string = ''

	constructor(value:string, objectName:string, objectId:string, ){
		super();
		this.createdDate = new Date();
		this.value = value;
		this.objectName = objectName; 
		this.objectId = objectId; 
	}
}

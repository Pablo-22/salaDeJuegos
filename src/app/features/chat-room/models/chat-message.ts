import { DataEntity } from "src/app/core/models/dataEntity/data-entity"
import { User } from "src/app/core/models/users/user"

export class ChatMessage extends DataEntity {
	userId:string = ''
	user:User = new User()
	body:string = ''
}

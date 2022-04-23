export class addTask {
    public taskTitle: string = '';
    public date: any = '';
    public category: any = '';
    public urgency: any = '';
    public description: string = '';

    constructor(obj?: any) {
        this.taskTitle = obj ? obj.taskTitle : '';
        this.date = obj ? obj.date : '';
        this.category = obj ? obj.category : '';
        this.urgency = obj ? obj.urgency : '';
        this.description = obj ? obj.description : '';
    }

    public toJson() {
        return {
            taskTitle: this.taskTitle,
            date: this.date,
            category: this.category,
            urgency: this.urgency,
            description: this.description
        }
    }
}
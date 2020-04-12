export class Task {
    constructor(
        public id?: string,
        public description?: string,
        public project?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) { }
}

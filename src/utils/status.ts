export class Status {
    static readonly STATUS_DELETED = 0;
    static readonly STATUS_PRIVATE = 1;
    static readonly STATUS_PUBLIC = 2;

    static getAllStatuses() {
        return [
            Status.STATUS_DELETED, 
            Status.STATUS_PRIVATE, 
            Status.STATUS_PUBLIC
        ];
    }

    static getDefaultStatus() {
        return Status.STATUS_PRIVATE;
    }
}
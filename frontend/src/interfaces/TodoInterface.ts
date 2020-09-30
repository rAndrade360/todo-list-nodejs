export default interface TodoInterface {
    id?: number;
    name: string;
    is_important: boolean;
    completed: boolean;
    project_id?: number | null;
    schedule?: Date;
}
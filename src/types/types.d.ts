type Children = {
    children:React.ReactNode
};
type Users = {
    id:number;
    name:string;
    email:string;
    phone:string;
    position:string;
    position_id:number;
    registration_timestamp:number;
    photo:string;
}
type Links = {
    next_url:string;
    prev_url?:string|null;
};
type UserList = {
    success:boolean;
    total_pages:number;
    total_users:number;
    count:number;
    page:number;
    links:Links;
    users: Users[];
}
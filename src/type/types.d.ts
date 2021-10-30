interface IStudent {
    city: string;
    company: string;
    email: string;
    firstName: string;
    grades: Array<string>;
    id: string;
    lastName: string;
    pic: string;
    skill: string;
    tags?: Array<string>;
}
interface IGrades {
    grades: string[];
}

type TError = {
    response: { data: { message: string } };
};
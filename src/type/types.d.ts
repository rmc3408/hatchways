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
}
interface IGrades {
    grades: string[];
}

type TError = {
    response: { data: { message: string } };
};

interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
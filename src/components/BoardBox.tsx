import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { getData } from "../API/getData";
import { Row, Card, Divider } from "antd";
import { v4 as uuidv4 } from "uuid";

const BoardBox = () => {
  const [dataDisplayed, setDataDisplayed] = useState<IStudent[] | null>(null);
  const [listN, setListN] = useState<IStudent[] | undefined>(undefined);
  const [listT, setListT] = useState<IStudent[] | undefined>(undefined);
  //const [isFiltering, setIsFiltering] = useState<boolean>(false);

  useEffect(() => {
    function fetch() {
      return getData().then((res) => res.data.students);
    }
    fetch().then((res) => {
      setListT(res);
      setListN(res);
    });
  }, []);

  const getTags = (arr: string[], id: string): void => {
    const oldStud = listT?.find((stud) => stud.id === id);
    const idx = listT?.findIndex((stud) => stud.id === id);

    if (
      typeof oldStud !== "undefined" &&
      typeof idx !== "undefined" &&
      idx > -1
    ) {
      let newList = [...listT!];
      console.log(newList);
      const newStudent = { ...oldStud, tags: arr };
      newList.splice(idx, 1, newStudent);
      setListT(newList);
      setListN(newList);
      setDataDisplayed(newList);
    }
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.toLowerCase();

    if (txt.length > 0 && e.target.name === "name") {
      const filtered = listN?.filter(
        ({ firstName, lastName }) =>
          firstName.toLowerCase().includes(txt) ||
          lastName.toLowerCase().includes(txt)
      );
      if (typeof filtered !== "undefined") {
        
        setListN(filtered);
      }
    }

    if (txt.length > 0 && e.target.name === "tag") {
      const filtered = listT?.filter(({ tags }) => tags?.includes(txt));
      if (typeof filtered !== "undefined") {
        setListN(filtered);
      }
      // else if (typeof filtered === "undefined") {
      //   //ADD NOTHING FOUND
      //   setListN(listT);
      //   //setIsFiltering(false);
      // }
    }
  };

  useEffect(() => {
    if (typeof listN !== "undefined") {
      setDataDisplayed(listN)
    }
  }, [listN]);

  return (
    <Fragment>
      <div className="Center-BoardBox">
        <input
          placeholder="Search by name"
          name="name"
          onChange={onNameChange}
          className="input-Name-BoardBox"
        />
        <input
          placeholder="Search by Tag"
          name="tag"
          onChange={onNameChange}
          className="input-Name-BoardBox"
        />
        <Card>
          <Row justify="center" align="middle">
            {dataDisplayed && dataDisplayed.map((stud: IStudent) => {
              return (
                <Fragment key={uuidv4()}>
                  <StudentCard {...stud} getTags={getTags} />
                  <Divider />
                </Fragment>
              );
            })}
          </Row>
        </Card>
      </div>
    </Fragment>
  );
};

export default BoardBox;

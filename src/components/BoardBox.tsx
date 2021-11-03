import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { getData } from "../API/getData";
import { Row, Card, Divider } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addStudents } from "../store/actions";
import { RootState, AppDispatch } from "../store/store";

const BoardBox = () => {
  const students: Array<IStudent> = useSelector(
    (state: RootState) => state.students
  );
  const dispatch = useDispatch<AppDispatch>();
  const [dataDisplayed, setDataDisplayed] = useState<IStudent[]>(students);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isNameFiltered, setIsNameFiltered] = useState<boolean>(false);

  useEffect(() => {
    function fetchStudents() {
      return getData().then((res) => res.data.students);
    }
    fetchStudents().then((res) => {
      dispatch(addStudents(res));
      setIsFetched(true);
    });
  }, []);

  // const getTags = (arr: string[], id: string): void => {
  //   const oldStud = listN?.find((stud) => stud.id === id);
  //   const idx = listN?.findIndex((stud) => stud.id === id);

  //   if (
  //     typeof oldStud !== "undefined" &&
  //     typeof idx !== "undefined" &&
  //     idx > -1
  //   ) {
  //     let newList = [...listN!];
  //     const newStudent = { ...oldStud, tags: arr };
  //     newList.splice(idx, 1, newStudent);

  //     setListN(newList);
  //     setDataDisplayed(newList);
  //   }
  // };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.toLowerCase();

    if (txt.length > 0 && e.target.name === "name") {
      const filtered = students.filter(
        ({ firstName, lastName }) =>
          firstName.toLowerCase().includes(txt) ||
          lastName.toLowerCase().includes(txt)
      );
      setIsNameFiltered(true);
      setDataDisplayed(filtered);
      console.log(filtered.length);
      
    } else if (txt.length === 0) {
      setDataDisplayed(students);
      setIsNameFiltered(false);
      console.log(dataDisplayed.length);
    }
  };

  // const onTagSearch = (e: ChangeEvent<HTMLInputElement>) => {
  //   const txt = e.target.value.toLowerCase();
  //   let arrTagTrue: Array<boolean> = [];

  //   if (txt.length > 0 && e.target.name === "tag") {
  //     const Tagfound = searchCardByTag(e.target.value);
  //   }
  //   return;
  // };

  // useEffect(() => {
  //   if (typeof dataDisplayed !== "undefined" && dataDisplayed?.length === 0) {
  //     setDataDisplayed(listN);
  //   }
  // }, [listN]);

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
            {isFetched &&
              !isNameFiltered &&
              students.map((stud: IStudent) => {
                return (
                  <Fragment key={uuidv4()}>
                    <StudentCard {...stud} />
                    <Divider />
                  </Fragment>
                );
              })}
            {isFetched &&
              isNameFiltered &&
              dataDisplayed?.map((stud: IStudent) => {
                return (
                  <Fragment key={uuidv4()}>
                    <StudentCard {...stud} />
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

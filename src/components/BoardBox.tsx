import React, { ChangeEvent, Fragment, useState } from "react";
import StudentCard from "./StudentCard";
import { getData } from "../API/getData";
import { useQuery } from "react-query";
import { Row, Card, Divider, Input } from "antd";

const BoardBox = () => {
  const [fullNamefiltered, setFullNamefiltered] = useState<IStudent[] | undefined>(undefined);

  const { isLoading, error, data } = useQuery<IStudent[], TError>(
    "students",
    () => getData()
  );

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.toLowerCase();
    const txtFiltered = data?.filter(
      ({ firstName, lastName }) =>
        firstName.toLowerCase().includes(txt) ||
        lastName.toLowerCase().includes(txt)
    );
    setFullNamefiltered(txtFiltered);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>An error has occurred</h1>;

  const FullData = data?.map((stud: IStudent) => {
    return (
      <Fragment key={stud.id}>
        <StudentCard {...stud} />
        <Divider />
      </Fragment>
    );
  });

  const NamedFilteredData = fullNamefiltered?.map((stud: IStudent) => {
    return (
      <Fragment key={stud.id}>
        <StudentCard {...stud} />
        <Divider />
      </Fragment>
    );
  });

  return (
    <div className="Center-BoardBox">
      <Input
        size="large"
        placeholder="Search by name"
        onChange={onNameChange}
        allowClear
        className="input-Name-BoardBox"
      />

      <Card >
        <Row justify="center" align="middle">
          {NamedFilteredData ?? FullData}
        </Row>
      </Card>
    </div>
  );
};

export default BoardBox;

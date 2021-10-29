import React from "react";
import { Avatar, Typography, Col } from "antd";
const { Title } = Typography;

const StudentCard = (props: IStudent) => {
  const { pic, firstName, lastName, id, email, company, skill, grades } = props;

  const average =
    grades.reduce((acc, c) => acc + parseFloat(c), 0) / grades.length || 0;

  return (
    <>
      <Col offset={1} span={7}>
        <Avatar src={pic} alt={id} size={205} className="avatarStyle" />
      </Col>
      <Col span={14} offset={1}>
        <Title>
          {firstName.toUpperCase()} {lastName.toUpperCase()}
        </Title>
        <div className="CardText-StudentCard">
          <p>Email: {email}</p>
          <p>Company: {company}</p>
          <p>Skill: {skill}</p>
          <p>Average: {average}%</p>
        </div>
      </Col>
    </>
  );
};

export default StudentCard;

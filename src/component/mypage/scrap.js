import styled, { css } from "styled-components";
import Outline from "../../page/myoutline";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Type = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: -2px;
  cursor: pointer;
`;
const TypeOption = styled.div`
  padding: 10px 20px;
  margin-left: 50px;
  position: relative;
  z-index: 1;
  ${(props) =>
    props.selected &&
    css`
      border-bottom: 2px solid rgba(202, 144, 75, 0.41);
    `}
`;
const ProjectCount = styled.div`
  color: rgba(202, 144, 75, 0.56);
  font-size: 14px;
  margin-left: 20px;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const ItemBox = styled.div`
  //margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
`;
const Title = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(0, 0, 0, 1);
  font-size: 14px;
  text-align: center;
  width: 220px;
  height: 30px;
  border-radius: 10px;
  bottom: 20px;
  z-index: 1;
  display: flex;
  align-items: center;
`;
const TitleText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
`;
export default function Myscrap() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("자취레터");

  useEffect(() => {
    if (location.pathname.includes("shareletter")) {
      setSelected("공유레터");
    } else {
      setSelected("자취레터");
    }
  }, [location.pathname]);

  const getBasePath = (type) => {
    return type === "자취레터" ? "homeletter" : "shareletter";
  };
  const handleTypeClick = (type) => {
    setSelected(type);
    navigate(`/myscrap/${getBasePath(type)}`);
  };
  const handleClick = (id) => {
    navigate(`/scrap/${getBasePath(selected)}/${id}`);
  };
  const userScraps = [
    {
      id: 1,
      title: "이미 구매한 물건을 또 구매하고 있다면 !",
    },
    // more projects
  ];
  return (
    <Outline>
      <Type>
        <TypeOption
          selected={selected === "자취레터"}
          onClick={() => handleTypeClick("자취레터")}
        >
          자취레터
        </TypeOption>
        <TypeOption
          selected={selected === "공유레터"}
          onClick={() => handleTypeClick("공유레터")}
        >
          공유레터
        </TypeOption>
      </Type>
      <div className="border-t-2 border-gray-200"></div>
      <div className="flex row text-lg font-medium p-4 ml-10">
        All <ProjectCount>{userScraps.length}</ProjectCount>
      </div>
      <ItemWrapper>
        {userScraps.map((project) => (
          <ItemBox key={project.id} onClick={() => handleClick(project.id)}>
            <Title>
              <TitleText>{project.title}</TitleText>
            </Title>
            <img className="w-64 h-44 m-2 bg-mypageGray" />
          </ItemBox>
        ))}
      </ItemWrapper>
    </Outline>
  );
}

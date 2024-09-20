import React from "react";
import GroupCard from "../GroupCard/GroupCard";
import "./GroupCardList.css";

// 그룹 데이터 배열
const groups = [
  {
    id: 1,
    title: "에델바이스",
    description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
    daysLeft: 265,
    badges: 2,
    comments: 8,
    views: 1.5,
    image: "https://via.placeholder.com/150",
    isPrivate: false,
  },
  {
    id: 2,
    title: "달봉이네 가족",
    description: "달봉이네 가족의 행복한 순간을 담았습니다.",
    daysLeft: 265,
    badges: 2,
    comments: 8,
    views: 1.5,
    image: "https://via.placeholder.com/150",
    isPrivate: true,
  },
  // 더 많은 그룹 객체 추가 가능
];

const GroupCardList = ({ isPublic }) => {
  // isPublic 상태에 따라 그룹 필터링
  const filteredGroups = groups.filter((group) =>
    isPublic ? !group.isPrivate : group.isPrivate
  );

  return (
    <div className="group-card-list">
      {filteredGroups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupCardList;

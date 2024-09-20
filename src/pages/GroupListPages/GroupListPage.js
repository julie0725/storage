import React, { useState, useEffect } from "react";
import { fetchGroups } from "../../utils/api";
import GroupCardList from "../../components/GroupCardList/GroupCardList";
import EmptyGroupImg from "../../assets/card/type=group.png";
import "./GroupListPage.css"; // 스타일링을 위한 css 파일

const GroupListPage = () => {
  const [isPublic, setIsPublic] = useState(true); // 기본 상태는 Public
  const [groups, setGroups] = useState([]); // 그룹 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 그룹 데이터를 가져오는 함수
  const loadGroups = async () => {
    setLoading(true);
    try {
      const data = await fetchGroups(); // 그룹 데이터를 불러오는 API 함수
      setGroups(data);
    } catch (error) {
      console.error("그룹을 불러오는데 오류가 발생했습니다", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 그룹 데이터를 로드
  useEffect(() => {
    loadGroups();
  }, []);

  // 공개/비공개 상태 전환 버튼에 클래스를 설정하는 함수
  const getToggleButtonClass = (isActive) =>
    `toggle-button ${isActive ? "active" : ""}`;

  // 로딩 중이거나 그룹이 없을 때 표시하는 컴포넌트
  const renderEmptyState = () => (
    <div className="empty-group-list">
      <img src={EmptyGroupImg} alt="등록된 그룹이 없습니다." />
      <h2>등록된 그룹이 없습니다.</h2>
      <p>가장 먼저 그룹을 만들어보세요!</p>
      <button className="create-group-button">그룹 만들기</button>
    </div>
  );

  // 로딩 중일 때 또는 그룹이 없을 때 보여줄 내용을 결정하는 함수
  const renderGroupContent = () => {
    if (loading) {
      return <p>로딩 중...</p>;
    }

    if (groups.length === 0) {
      return renderEmptyState();
    }

    return <GroupCardList isPublic={isPublic} groups={groups} />;
  };

  return (
    <div className="group-list-page">
      <div className="group-header">
        {/* 왼쪽에 공개/비공개 버튼 */}
        <div className="group-toggle">
          <button
            className={getToggleButtonClass(isPublic)}
            onClick={() => setIsPublic(true)}
          >
            공개
          </button>
          <button
            className={getToggleButtonClass(!isPublic)}
            onClick={() => setIsPublic(false)}
          >
            비공개
          </button>
        </div>

        {/* 검색창 */}
        <div className="search-bar">
          <input type="text" placeholder="그룹명을 검색해 주세요" />
        </div>

        {/* 오른쪽에 공감순 버튼 */}
        <div className="dropdown">
          <button>공감순 ▼</button>
        </div>
      </div>

      {/* 그룹 목록이 표시될 곳 */}
      <div className="group-list">{renderGroupContent()}</div>
    </div>
  );
};

export default GroupListPage;

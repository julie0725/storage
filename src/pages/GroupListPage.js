import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGroups } from "../utils/api";
import GroupCardList from "../components/GroupCardList/GroupCardList";
import GroupToggle from "../components/GroupToggle/GroupToggle";
import EmptyGroupImg from "../assets/card/type=group.png";
import "./GroupListPage.css";

const GroupListPage = () => {
  const [isPublic, setIsPublic] = useState(true); // 기본 상태: Public
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // 페이지당 10개
  const [sortBy] = useState("latest");
  const [keyword, setKeyword] = useState(""); // 검색어 상태

  const loadGroups = async () => {
    setLoading(true);
    try {
      const data = await fetchGroups({
        page,
        pageSize,
        sortBy,
        keyword,
        isPublic,
      });
      setGroups(data.data); // API 그룹 데이터 -> 상태에 저장
    } catch (error) {
      console.error("그룹을 불러오는데 오류가 발생했습니다", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, [page, pageSize, sortBy, keyword, isPublic]);

  // 로딩 중이거나 그룹이 없을 때 표시할거야 - 보류
  const renderEmptyState = () => (
    <div className="empty-group-list">
      <img src={EmptyGroupImg} alt="등록된 그룹이 없습니다." />
      <Link to="/create-group">
        <button className="create-group-button bottom-button">
          그룹 만들기
        </button>
      </Link>
    </div>
  );

  // 로딩 중일 때 or 그룹이 없을 때 보여줄 내용
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
        <GroupToggle isPublic={isPublic} setIsPublic={setIsPublic} />

        <div className="search-bar">
          <input
            type="text"
            placeholder="그룹명을 검색해 주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="dropdown">
          <button>공감순 ▼</button>
        </div>
      </div>

      <div className="group-list">{renderGroupContent()}</div>
    </div>
  );
};

export default GroupListPage;

export const fetchGroups = async ({
  page = 1,
  pageSize = 10,
  sortBy = "latest",
  keyword = "",
  isPublic = true,
}) => {
  try {
    const response = await fetch(
      `/api/groups?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&keyword=${keyword}&isPublic=${isPublic}`
    );
    if (!response.ok) {
      throw new Error("네트워크 응답이 좋지 않습니다.");
    }
    return await response.json(); // JSON 데이터를 파싱해서 반환
  } catch (error) {
    console.error("그룹 데이터를 가져오는 데 오류가 발생했습니다:", error);
    throw error; // 호출한 쪽에서 에러를 처리할 수 있게 에러를 던짐
  }
};

// export const fetchGroups = async () => {
//   try {
//     const response = await fetch("/api/groups");
//     if (!response.ok) {
//       throw new Error("네트워크 응답이 좋지 않습니다.");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("그룹 데이터를 가져오는 데 오류가 발생했습니다:", error);
//     throw error; // 오류를 다시 던져서 호출한 쪽에서 처리할 수 있게 함
//   }
// };

// src/utils/api.js
export const fetchGroups = async () => {
  // 임시 그룹 데이터를 반환하는 함수
  return [
    {
      id: 1,
      title: "에델바이스",
      description: "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.",
      daysLeft: 265,
      badges: 2,
      comments: 8,
      views: 1.5,
      image: "../../assets/image=img1.png",
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
      image: "../../assets/image=img1.png",
      isPrivate: true,
    },
    // 추가 데이터
  ];
};

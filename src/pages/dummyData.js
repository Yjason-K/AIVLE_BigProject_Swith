const generateDummyData = () => {
  const dummyData = [];

  for (let i = 1; i <= 100; i++) {
    const data = {
      id: i,
      title: `글 제목 ${i}`,
      author: `작성자 ${i}`,
      createdate: "2023-06-01",
      like: Math.floor(Math.random() * 50) + 1,
      view: Math.floor(Math.random() * 500) + 1,
    };

    dummyData.push(data);
  }

  return dummyData;
};

export default generateDummyData();

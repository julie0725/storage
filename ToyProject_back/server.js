// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB 연결
// mongoose.connect('mongodb://localhost:27017/groupMemory')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // 모델 불러오기
// const Group = require('./models/Group');
// const Post = require('./models/Post');
// const Comment = require('./models/Comment');

// // API 엔드포인트
// app.use('/api/groups', require('./routes/groups'));
// app.use('/api/posts', require('./routes/posts'));
// app.use('/api/comments', require('./routes/comments'));

// // 서버 시작
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // bcrypt 추가

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/groupMemory')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// 모델 불러오기
const Group = require('./models/Group');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// API 엔드포인트
app.use('/api/groups', require('./routes/groups'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

// 그룹 생성 라우트 추가 (예시)
app.post('/api/groups', async (req, res, next) => {
  try {
    const password = req.body.password; // 비밀번호 가져오기
    if (!password) {
      return res.status(400).send('Password is required');
    }

    const hash = await bcrypt.hash(password, 10); // 비밀번호 해시화
    // 해시된 비밀번호 사용
    // 예: 새 그룹 생성 로직 추가

    res.status(201).send('Group created');
  } catch (error) {
    console.error('Error:', error.message); // 에러 메시지 출력
    next(error); // 에러를 다음 미들웨어로 전달
  }
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error('Error:', err.message); // 에러 메시지 출력
  res.status(500).send('Internal Server Error');
});

// 전역 에러 핸들러
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

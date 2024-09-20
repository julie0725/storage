const express = require('express');
const bcrypt = require('bcryptjs');
const Group = require('../models/Group');

const router = express.Router();
const mongoose = require('mongoose'); // mongoose 가져오기

// 그룹 등록
router.post('/', async (req, res) => {
    const { name, imageUrl, introduction, isPublic, password } = req.body; // 필드명 수정

    // 요청 본문 검증
    if (!name || !password) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해시화

        const newGroup = new Group({
            name,
            imageUrl, // 필드명 수정
            introduction, // 필드명 수정
            isPublic,
            password: hashedPassword
        });

        const savedGroup = await newGroup.save(); // 그룹 저장

        // 성공 응답 반환
        res.status(201).json({
            id: savedGroup._id,
            name: savedGroup.name,
            imageUrl: savedGroup.imageUrl,
            isPublic: savedGroup.isPublic,
            likeCount: savedGroup.likeCount,
            badges: savedGroup.badges,
            postCount: savedGroup.postCount,
            createdAt: savedGroup.createdAt,
            introduction: savedGroup.introduction
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 그룹 목록 조회
router.get('/', async (req, res) => {
    const groups = await Group.find();
    res.json(groups);
});


// 그룹 수정
router.put('/:groupId', async (req, res) => {
    const { groupId } = req.params;
    const { name, password, imageUrl, isPublic, introduction } = req.body;

    // 요청 본문 검증
    if (!name || !password) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        // groupId를 ObjectId로 변환
        const groupObjectId = new mongoose.Types.ObjectId(groupId);

        // 그룹 찾기
        const group = await Group.findById(groupObjectId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, group.password);
        if (!isMatch) {
            return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
        }

        // 그룹 정보 수정
        group.name = name;
        group.imageUrl = imageUrl;
        group.isPublic = isPublic;
        group.introduction = introduction;

        // 수정된 그룹 저장
        const updatedGroup = await group.save();

        // 성공 응답 반환
        res.status(200).json({
            id: updatedGroup._id,
            name: updatedGroup.name,
            imageUrl: updatedGroup.imageUrl,
            isPublic: updatedGroup.isPublic,
            likeCount: updatedGroup.likeCount,
            badges: updatedGroup.badges,
            postCount: updatedGroup.postCount,
            createdAt: updatedGroup.createdAt,
            introduction: updatedGroup.introduction
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 그룹 삭제
router.delete('/:groupId', async (req, res) => {
    const { groupId } = req.params;
    const { password } = req.body;

    // 요청 본문 검증
    if (!password) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        // groupId를 ObjectId로 변환
        const groupObjectId = new mongoose.Types.ObjectId(groupId);

        // 그룹 찾기
        const group = await Group.findById(groupObjectId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, group.password);
        if (!isMatch) {
            return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
        }

        // 그룹 삭제
        await Group.findByIdAndDelete(groupObjectId);

        // 성공 응답 반환
        res.status(200).json({ message: '그룹 삭제 성공' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 그룹 정보 조회
router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params;

    // 그룹 ID가 숫자인지 확인
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        // groupId를 ObjectId로 변환
        const groupObjectId = new mongoose.Types.ObjectId(groupId);

        // 그룹 찾기
        const group = await Group.findById(groupObjectId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }

        // 성공 응답 반환
        res.status(200).json({
            id: group._id,
            name: group.name,
            imageUrl: group.imageUrl,
            isPublic: group.isPublic,
            likeCount: group.likeCount,
            badges: group.badges,
            postCount: group.postCount,
            createdAt: group.createdAt,
            introduction: group.introduction
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

module.exports = router;

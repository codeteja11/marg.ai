const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

// @route   POST /api/ai/career-match
router.post('/career-match', async (req, res) => {
    try {
        const { interest, strength, education } = req.body;
        
        if(!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
             return res.json({ result: "1. AI Engineer - ₹6-15 LPA \n2. Full Stack Developer - ₹5-12 LPA \n3. UX Designer - ₹4-10 LPA", isMock: true });
        }

        const prompt = `Suggest 3 career options for an Indian student. Interest: ${interest}, Strength: ${strength}, Education: ${education}. For each career give: 1. Name 2. Salary in India 3. Required skills 4. Future scope`;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }]
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }
        });

        res.json({ result: response.data.choices[0].message.content });
    } catch (err) {
        res.json({ result: "1. Software Developer - ₹5-15 LPA \n2. Data Analyst - ₹4-12 LPA \n3. Product Manager - ₹8-25 LPA", isMock: true });
    }
});

// @route   POST /api/ai/mentor
router.post('/mentor', async (req, res) => {
    try {
        const { question, mode, language, profile } = req.body;
        
        if(!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
            const responseTxt = mode === "parent" 
                ? (language === 'hi' ? "माता-पिता के रूप में, बच्चे की रुचि को प्राथमिकता दें।" : "As a parent, focus on stability and your child's well-being.")
                : (language === 'hi' ? "आपकी रुचि के अनुसार सही रास्ता चुना जा सकता है।" : "Based on your interest, we'll plan step by step.");
            return res.json({ result: responseTxt, isMock: true });
        }

        const systemPrompt = `You are an AI Career Mentor for Indian students. Language: ${language === "hi" ? "Hindi" : "English"}. Mode: ${mode === "parent" ? "Parent Guidance" : "Student"}. Profile: ${JSON.stringify(profile)}`;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4-turbo",
            messages: [ { role: "system", content: systemPrompt }, { role: "user", content: question } ]
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }
        });

        res.json({ result: response.data.choices[0].message.content });
    } catch (err) {
        res.json({ result: "Focus on your strengths and consistency. India’s growth offers many opportunities.", isMock: true });
    }
});

// @route   POST /api/ai/job-market
router.post('/job-market', async (req, res) => {
    try {
        const { query, role } = req.body;
        if(!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
             return res.json({ result: "1. Tech Boom in Bangalore - Cloud Skills needed \n2. FinTech Rise in Mumbai - Security experts high demand", isMock: true });
        }
        const prompt = `Provide detailed job market intelligence for the role: ${role || 'Software Engineering'} in India. Include: 1. Demand forecast 2. Salary benchmarks 3. Key sector players 4. Skills currently oversupplied vs undersupplied.`;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }]
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }
        });
        res.json({ result: response.data.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ result: "Market data synchronization failed. Please try again." });
    }
});

// @route   POST /api/ai/future-intel
router.post('/future-intel', async (req, res) => {
    try {
        const { career1, career2, experience } = req.body;
        if(!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
             return res.json({ result: "Comparison: ${career1} has higher entry salary but ${career2} has more long-term stability in the AI age.", isMock: true });
        }
        const prompt = `Compare ${career1} vs ${career2} for a ${experience} in the Indian market from now until 2030. Provide: 1. Salary trajectory 2. Risk of AI automation 3. Work-life balance prediction 4. Recommendations for upskilling.`;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }]
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }
        });
        res.json({ result: response.data.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ result: "Future Intelligence engine unavailable." });
    }
});

// @route   POST /api/ai/generate-resume
router.post('/generate-resume', async (req, res) => {
    try {
        const { name, role, skills, education, projects } = req.body;
        if(!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai')) {
             return res.json({ result: "ATS Optimized Summary: Experienced ${role} skilled in ${skills}. Led project: ${projects}...", isMock: true });
        }
        const prompt = `Create an ATS-optimized professional summary and 5 detailed bullet points for a ${role} resume. Name: ${name}, Skills: ${skills}, Education: ${education}, Projects: ${projects}. Focus on quantitative results and clear keywords.`;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }]
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' }
        });
        res.json({ result: response.data.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ result: "Resume generation failed." });
    }
});

// @route   POST /api/ai/save-profile
router.post('/save-profile', auth, async (req, res) => {
    try {
        const { savedCareer, studentInfo } = req.body;
        const userId = req.user.id;

        if (global.dbMode === 'fallback') {
            let profile = await global.mockDB.profiles.findOne({ user: userId });
            if (!profile) {
                profile = { user: userId, savedCareers: [], studentInfo: {} };
                await global.mockDB.profiles.insert(profile);
            }
            if (savedCareer) profile.savedCareers.push(savedCareer);
            if (studentInfo) profile.studentInfo = { ...profile.studentInfo, ...studentInfo };
            await global.mockDB.profiles.update({ user: userId }, profile);
            return res.json(profile);
        }

        let profile = await Profile.findOne({ user: userId });
        if (!profile) profile = new Profile({ user: userId, savedCareers: [], studentInfo: {} });
        if (savedCareer) profile.savedCareers.push(savedCareer);
        if (studentInfo) profile.studentInfo = { ...profile.studentInfo, ...studentInfo };
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/ai/profile
router.get('/profile', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        let profile;
        
        if (global.dbMode === 'fallback') {
            profile = await global.mockDB.profiles.findOne({ user: userId });
        } else {
            profile = await Profile.findOne({ user: userId });
        }

        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

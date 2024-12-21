import express from 'express'
import { getWeather, postWeather } from '../controllers/weather.js';
const router= express.Router();

router.post('/',postWeather)
router.get('/',getWeather)

export default router


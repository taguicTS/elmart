import rateLimit from "express-rate-limit";



const publicRateLimiter = rateLimit({

	windowMs: 15 * 60 * 1000,
	legacyHeaders: false,
	standardHeaders: "draft-8",
	limit: 100
});

const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	legacyHeaders: false,
	standardHeaders: "draft-8",
	limit: 10
});

const createResourceRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	legacyHeaders: false,
	standardHeaders: "draft-8",
	limit: 30
});

const updateResourceRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	legacyHeaders: false,
	standardHeaders: "draft-8",
	limit: 15
})

export { publicRateLimiter, authRateLimiter, createResourceRateLimiter, updateResourceRateLimiter };
import express, { Request, Response, NextFunction } from "express";
export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {};
// export const register = async (req, res, next) => {
// 	try {
// 		const hash = bcrypt.hashSync(req.body.password, 5);
// 		const newUser = new User({
// 			...req.body,
// 			password: hash,
// 		});

// 		await newUser.save();
// 		res.status(201).send("User has been created");
// 	} catch (err) {
// 		next(err);
// 	}
// };
